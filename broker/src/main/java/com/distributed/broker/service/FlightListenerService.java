package com.distributed.broker.service;

import com.distributed.broker.config.RabbitConfig;
import com.distributed.broker.pojo.Flight;
import com.distributed.broker.pojo.FlightMessage;
import com.distributed.broker.repository.FlightRepository;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author RuchenLai
 * @createTime 2023-12-12 19:09:17
 * @description
 */
@Service
public class FlightListenerService {

    private static final Logger log = LoggerFactory.getLogger(FlightListenerService.class);
    @Autowired
    FlightRepository flightRepository;

    @RabbitListener(queues = RabbitConfig.FLIGHT_QUEUE)
    public void receiveMessage(final FlightMessage flightMessage) {
        log.info("Received message and deserialized to 'FlightMessage': {}", flightMessage.toString());
        flightRepository.save(Flight.builder()
                .flightNo(flightMessage.getFlightNo())
                .airline(flightMessage.getAirline())
                .dst(flightMessage.getDst())
                .src(flightMessage.getSrc())
                .price(flightMessage.getPrice())
                .rating(flightMessage.getRating())
                .build());
    }
}
