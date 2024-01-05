package com.distributed.broker.pojo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * @author RuchenLai
 * @createTime 2023-12-30 22:09:49
 * @description
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Order implements Serializable {
    @Id
    @JsonProperty("order_id")
    private String orderId;
    @JsonProperty("user_id")
    private String userId;
    @JsonProperty("flights_info")
    private List<Flight> flights;
    @JsonProperty("price")
    private double price;
    @JsonProperty("price_up_rate")
    private double priceUpRate;
    @JsonProperty("order_status")
    private int orderStatus;
    @JsonProperty("update_time")
    @CreatedDate
    private Date updateTime;
    @JsonProperty("create_time")
    @LastModifiedDate
    private Date createTime;
}

