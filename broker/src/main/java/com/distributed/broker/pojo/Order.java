package com.distributed.broker.pojo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.List;

/**
 * @author RuchenLai
 * @createTime 2023-12-30 22:09:49
 * @description
 */
@Data
@Builder
public class Order {
    @Id
    @JsonProperty("_id")
    private String orderId;
    @JsonProperty("user_id")
    private String userId;
    @JsonProperty("flights_info")
    private List<Flight> flights;
    @JsonProperty("price")
    private int price;
    @JsonProperty("price_up_rate")
    private double priceUpRate;
    @JsonProperty("order_status")
    private int orderStatus;
    @JsonProperty("update_time")
    private String updateTime;
    @JsonProperty("create_time")
    private String createTime;
}
