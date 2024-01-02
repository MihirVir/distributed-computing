package com.distributed.broker.controller.Request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

/**
 * @author RuchenLai
 * @createTime 2024-01-02 04:33:38
 * @description
 */
@Data
public class AirlinePayRequest {
    @JsonProperty
    String user_id;
    @JsonProperty
    String flight_no;
    @JsonProperty
    double price;
}
