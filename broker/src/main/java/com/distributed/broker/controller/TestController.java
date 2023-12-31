package com.distributed.broker.controller;

import lombok.Getter;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author RuchenLai
 * @createTime 2023-12-12 20:06:53
 * @description
 */
@RestController
public class TestController {
    @GetMapping("test")
    public String testDuration() throws InterruptedException {

        return "executed";
    }
}
