package com.distributed.broker.controller.Response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

/**
 * @author RuchenLai
 * @createTime 2023-12-31 14:06:40
 * @description
 */
@Data
@Builder
public class CreateOrderResponse {
    @JsonProperty
    double price;
}
