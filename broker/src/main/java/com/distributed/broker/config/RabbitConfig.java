package com.distributed.broker.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitAdmin;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.rabbit.listener.RabbitListenerEndpointRegistry;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

/**
 * @author RuchenLai
 * @createTime 2023-12-12 18:34:29
 * @description
 */
@Configuration
public class RabbitConfig {
    //update flight service
    public final static String FLIGHT_QUEUE = "flight.queue";
    public final static String FLIGHT_EXCHANGE = "flight.exchange";
    public final static String FLIGHT_ROUTING_KEY = "filght";

    //order service
    public static final String ORDER_EXCHANGE = "order.exchange";
    public static final String ORDER_QUEUE = "order.queue";
    public static final String ORDER_ROUTING_KEY = "order";
    //dead-letter-queue
    public static final String DL_EXCHANGE = "dead.exchange";
    public static final String DL_QUEUE = "dead.queue";
    public static final String DL_ROUTING_KEY = "dead";



    //static route to get routes
    @Bean
    public DirectExchange directExchange() {

        return new DirectExchange(RabbitConfig.FLIGHT_EXCHANGE,true,false);
    }
    @Bean
    public Queue routesQueue(){

        return new Queue(RabbitConfig.FLIGHT_QUEUE,true);
    }
    @Bean
    Binding bindingDirect() {
        return BindingBuilder.bind(routesQueue()).to(directExchange()).with(RabbitConfig.FLIGHT_ROUTING_KEY);
    }
    @Bean
    public RabbitTemplate rabbitTemplate(final ConnectionFactory connectionFactory) {
        final var rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(producerJackson2MessageConverter());
        return rabbitTemplate;
    }
    @Bean
    public Jackson2JsonMessageConverter producerJackson2MessageConverter() {
        return new Jackson2JsonMessageConverter();
    }
    @Bean
    public DirectExchange dlxExchange() {
        return new DirectExchange(RabbitConfig.DL_EXCHANGE);
    }
    @Bean
    public Queue dlxQueue() {
        return new Queue(RabbitConfig.DL_QUEUE);
    }
    @Bean
    public DirectExchange orderExchange() {
        return new DirectExchange(RabbitConfig.ORDER_EXCHANGE);
    }
    @Bean
    public Queue orderQueue() {
        Map<String, Object> arguments = new HashMap<>(2);
        // bond dead-letter exchange
        arguments.put("x-dead-letter-exchange", RabbitConfig.DL_EXCHANGE);
        // bond routing key
        arguments.put("x-dead-letter-routing-key", RabbitConfig.DL_ROUTING_KEY);
        return new Queue(RabbitConfig.ORDER_QUEUE, true, false, false, arguments);
    }
    @Bean
    public Binding orderBinding() {
        return BindingBuilder.bind(orderQueue()).to(orderExchange()).with(RabbitConfig.ORDER_ROUTING_KEY);
    }
    @Bean
    public Binding binding() {
        return BindingBuilder.bind(dlxQueue()).to(dlxExchange()).with(RabbitConfig.DL_ROUTING_KEY);
    }

}
