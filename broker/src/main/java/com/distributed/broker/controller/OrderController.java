package com.distributed.broker.controller;

import com.distributed.broker.common.exeption.ResultResponse;
import com.distributed.broker.common.version.ApiVersion;
import com.distributed.broker.controller.Request.CreateOrderRequest;
import com.distributed.broker.controller.Response.CreateOrderResponse;
import com.distributed.broker.service.OrderService;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * @author RuchenLai
 * @createTime 2023-12-31 06:11:11
 * @description
 */
@RestController
@ApiVersion
@RequestMapping(value = "broker_service/api/{version}/order", method = {RequestMethod.POST, RequestMethod.GET}, produces = "application/json;charset=UTF-8")
public class OrderController {

    @Autowired
    OrderService orderService;

    @ApiVersion("1")
    @RequestMapping(value = "create",method = RequestMethod.POST)
    public ResultResponse createOrder(@RequestBody CreateOrderRequest createOrderRequest){
        return ResultResponse.success(orderService.createOrder(createOrderRequest.getUserId(), createOrderRequest.getFlightMap()));
    }
}
