package com.distributed.broker.service;

import com.distributed.broker.common.exeption.BusinessException;
import com.distributed.broker.common.exeption.ExceptionEnum;
import com.distributed.broker.common.utils.HttpUtil;
import com.distributed.broker.config.RabbitConfig;
import com.distributed.broker.pojo.Flight;
import com.distributed.broker.pojo.FlightMessage;
import com.distributed.broker.pojo.Order;
import com.distributed.broker.pojo.UserActivity;
import com.distributed.broker.repository.FlightRepository;
import com.distributed.broker.repository.OrderRepository;
import com.distributed.broker.repository.UserActivityRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import lombok.Getter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.AmqpException;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessagePostProcessor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.aggregation.ArrayOperators;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

/**
 * @author RuchenLai
 * @createTime 2023-12-31 06:11:55
 * @description
 */
@Service
public class OrderService {
    private static final Logger log = LoggerFactory.getLogger(FlightListenerService.class);

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Autowired
    FlightRepository flightRepository;
    @Autowired
    OrderRepository orderRepository;
    @Autowired
    UserActivityRepository userActivityRepository;
    @Value("${api.flight.airline1}")
    String airline1Flight;
    @Value("${api.flight.airline2}")
    String airline2Flight;
    @Value("${api.pay.airline1}")
    String airline1Pay;
    @Value("${api.pay.airline2}")
    String airline2Pay;
    @Value("${order.expire-time}")
    String expireTime;
    @Getter
    private Map<String, String> flightUrlMap;
    @Getter
    private Map<String, String> payUrlMap;

    @PostConstruct
    public void init() {
        flightUrlMap = new HashMap<>();
        flightUrlMap.put("ANA Airline", airline1Flight);
        flightUrlMap.put("Emirates", airline2Flight);
        payUrlMap = new HashMap<>();
        payUrlMap.put("ANA Airline",airline1Pay);
        payUrlMap.put("Emirates",airline2Pay);
    }
    public Order createOrder(String userID, Map<String,String> flightMap){
        double totalPrice = 0;
        //get the newest price from the airlines
        List<CompletableFuture<Flight>> futures = new ArrayList<>();
        flightMap.forEach((flightNo, airlineNo) -> {
            System.out.println("key = " + flightNo + ", value = " + airlineNo);
            try {
                futures.add(getNewestPrice(flightNo,airlineNo));
            } catch (JsonProcessingException e) {
                log.error(e.getMessage());
                throw new BusinessException(ExceptionEnum.UNKNOWN_ERROR);
            }
        });
        //get the increase rate from db
        double rate = 0.0;
        Optional<UserActivity> userActivityOpt = userActivityRepository.findById(userID);
        if(userActivityOpt.isPresent()){
            UserActivity userActivity = userActivityOpt.get();
            log.info(userActivity.toString());
            rate = userActivity.getCurrentRate();
        }
        //calculate the price and save the order record in db
        List<Flight> flights = new ArrayList<>();
        for (CompletableFuture<Flight> future : futures) {
            Flight flight;
            try {
                flight = future.get();
                flights.add(flight);
                totalPrice += flight.getPrice();
            } catch (InterruptedException | ExecutionException e) {
                log.error(e.getMessage());
                throw new BusinessException(ExceptionEnum.UNKNOWN_ERROR);
            }
        }
        log.info("rate: "+rate);
        totalPrice = totalPrice*(1+rate);
        //save the data in db
        Order order = orderRepository.insert(Order.builder()
                .userId(userID)
                .flights(flights)
                .price(totalPrice)
                .priceUpRate(rate)
                .orderStatus(0).build());
        //publish order to order queue
        rabbitTemplate.convertAndSend(RabbitConfig.ORDER_EXCHANGE,RabbitConfig.ORDER_ROUTING_KEY,order.getOrderId(),messagePostProcessor());
        return order;
    }
    @Async("threadPoolTaskExecutor")
    public CompletableFuture<Flight> getNewestPrice(String flightNo, String airlineNo) throws JsonProcessingException {
        Optional<Flight> flightOpt = flightRepository.findById(flightNo);
        Flight flight;
        if(flightOpt.isPresent()){
            flight = flightOpt.get();
            log.info(flight.toString());
            MultiValueMap<String, String> param = new LinkedMultiValueMap<>();
            //param.add("flight_no",flightNo);
            log.info("Request "+airlineNo+" update flight API.");
            String result = HttpUtil.get(flightUrlMap.get(airlineNo)+flightNo,param);
            log.info("Received"+airlineNo+" response.");
            if(result.isEmpty()){
                throw new BusinessException(ExceptionEnum.API_RESPONSE_EMPTY);
            }
            log.info(result);
            ObjectMapper mapper = new ObjectMapper();
            flight.setPrice(mapper.readValue(result, Flight.class).getPrice());
        }else {
            throw new BusinessException(ExceptionEnum.RECORD_NOT_EXIST);
        }
        return CompletableFuture.completedFuture(flight);
    }

    private MessagePostProcessor messagePostProcessor(){
        return  new MessagePostProcessor() {
            @Override
            public Message postProcessMessage(Message message) throws AmqpException {
                message.getMessageProperties().setExpiration(expireTime);
                return message;
            }
        };
    }

    public Boolean payForOrder(String orderId){
        Optional<Order> orderOpt = orderRepository.findById(orderId);
        if(orderOpt.isPresent()){
            Order order = orderOpt.get();
            List<Flight> flightList = order.getFlights();
            List<CompletableFuture<Integer>> futures = new ArrayList<>();
            for (Flight flight:flightList
                 ) {
                futures.add(payOderToAirline(flight.getAirline(),order.getUserId(),flight.getFlightNo(),flight.getPrice()));
            }
            for (CompletableFuture<Integer> future : futures) {
                try {
                    if(future.get()==0){
                        return false;
                    }
                } catch (InterruptedException | ExecutionException e) {
                    log.error(e.getMessage());
                    throw new BusinessException(ExceptionEnum.UNKNOWN_ERROR);
                }
            }
            order.setOrderStatus(1);
            orderRepository.save(order);
            return true;
        }else {
            throw new BusinessException(ExceptionEnum.RECORD_NOT_EXIST);
        }
    }

    @Async("threadPoolTaskExecutor")
    public CompletableFuture<Integer> payOderToAirline(String airlineNo, String userId, String flightNo, double price){
        Map<String, String> param = new HashMap<>();
        param.put("user_id",userId);
        param.put("flight_no",flightNo);
        param.put("price", String.valueOf(price));
        log.info("Request "+airlineNo+" payment API.");
        try {
            // Create ObjectMapper instance
            ObjectMapper objectMapper = new ObjectMapper();
            // Convert Map to JSON string
            log.info(airlineNo+":"+payUrlMap.get(airlineNo));
            String json =  objectMapper.writeValueAsString(param);
            log.info("request body: "+json);
            String result = HttpUtil.post(payUrlMap.get(airlineNo), json);
            log.info(result);
            log.info("Received"+airlineNo+" response.");
            if(result.isEmpty()){
                throw new BusinessException(ExceptionEnum.API_RESPONSE_EMPTY);
            }
            log.info(result);
            // Convert JSON string to Map
            Map<String, String> resultMap = null;
            try {
                resultMap = objectMapper.readValue(result, new TypeReference<Map<String, String>>() {});
            } catch (JsonProcessingException e) {
                log.error(e.getMessage());
                throw new BusinessException(ExceptionEnum.UNKNOWN_ERROR);
            }
            return CompletableFuture.completedFuture(Integer.parseInt(resultMap.get("status")));
        } catch (JsonProcessingException e) {
            // Handle exception if conversion fails
            log.error(e.getMessage());
            return null;
        }
    }
}
