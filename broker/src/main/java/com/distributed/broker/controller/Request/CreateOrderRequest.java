package com.distributed.broker.controller.Request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.Map;

/**
 * @author RuchenLai
 * @createTime 2023-12-31 13:56:19
 * @description
 */
@Data
public class CreateOrderRequest {
    @JsonProperty
    String userId;
    @JsonProperty
    Map<String,String> flightMap;
}
