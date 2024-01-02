package com.distributed.broker.pojo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

/**
 * @author RuchenLai
 * @createTime 2023-12-30 01:58:10
 * @description
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "flights")
public class Flight implements Serializable {
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
    private double price;
    @JsonProperty("rating")
    private double rating;
}
