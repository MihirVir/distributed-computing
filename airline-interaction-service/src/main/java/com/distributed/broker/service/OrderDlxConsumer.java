package com.distributed.broker.service;

import com.distributed.broker.common.exeption.BusinessException;
import com.distributed.broker.common.exeption.ExceptionEnum;
import com.distributed.broker.config.RabbitConfig;
import com.distributed.broker.pojo.Order;
import com.distributed.broker.repository.OrderRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.Optional;

/**
 * @author RuchenLai
 * @createTime 2024-01-02 00:08:11
 * @description
 */
@Component
public class OrderDlxConsumer {

    private static final Logger log = LoggerFactory.getLogger(FlightListenerService.class);

    @Autowired
    private OrderRepository orderRepository;

    /**
     * listening the dead message queue
     */
    @RabbitListener(queues = RabbitConfig.DL_QUEUE)
    public void orderConsumer(String orderId) {
        log.info("Consume order in DMQ: "+orderId);
        if (StringUtils.isEmpty(orderId)) {
            return;
        }
        Optional<Order> orderOpt = orderRepository.findById(orderId);
        if(orderOpt.isPresent()){
            Order order = orderOpt.get();
            if(0 == order.getOrderStatus()){
                order.setOrderStatus(2);
                orderRepository.save(order);
            }
        }else {
            throw new BusinessException(ExceptionEnum.RECORD_NOT_EXIST);
        }
    }
}