package com.distributed.broker.pojo;

import lombok.Data;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * @author RuchenLai
 * @createTime 2023-12-12 21:29:20
 * @description
 */
@Data
public class FlightMessage {
    @JsonProperty("flight_no")
    private String flightNo;
    @JsonProperty("airline")
    private String airline;
    @JsonProperty("src")
    private String src;
    @JsonProperty("dst")
    private String dst;
    @JsonProperty("price")
    private int price;
    @JsonProperty("rating")
    private double rating;
}
