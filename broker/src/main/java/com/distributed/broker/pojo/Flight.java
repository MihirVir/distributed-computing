package com.distributed.broker.pojo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * @author RuchenLai
 * @createTime 2023-12-30 01:58:10
 * @description
 */
@Data
@Builder
@Document(collection = "flights")
public class Flight {
    @Id
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
