package com.distributed.broker.controller.Response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author RuchenLai
 * @createTime 2024-01-02 04:21:33
 * @description
 */
@Data
@AllArgsConstructor
public class PayResponse {
    @JsonProperty
    int status;
}
