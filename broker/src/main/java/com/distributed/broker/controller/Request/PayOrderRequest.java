package com.distributed.broker.controller.Request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

/**
 * @author RuchenLai
 * @createTime 2024-01-02 04:16:49
 * @description
 */
@Data
public class PayOrderRequest {
    @JsonProperty
    String orderId;
}
