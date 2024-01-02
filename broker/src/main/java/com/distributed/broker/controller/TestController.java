package com.distributed.broker.controller;

import com.distributed.broker.pojo.Flight;
import com.distributed.broker.pojo.UserActivity;
import com.distributed.broker.repository.UserActivityRepository;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @author RuchenLai
 * @createTime 2023-12-12 20:06:53
 * @description
 */
@RestController
public class TestController {
    @Autowired
    UserActivityRepository userActivityRepository;
    @RequestMapping(method = RequestMethod.GET, value = "test1/{flight_no}")
    public Flight test1(@PathVariable("flight_no") String flight_no){
        return Flight.builder().flightNo("001").dst("CHN").src("IRE").airline("ANA Airline").rating(5).price(500).build();
    }
    @RequestMapping(method = RequestMethod.GET, value = "test2/{flight_no}")
    public Flight test2(@PathVariable("flight_no") String flight_no){
        return Flight.builder().flightNo("002").dst("CHN").src("IRE").airline("Emirates").rating(5).price(500).build();
    }
}
