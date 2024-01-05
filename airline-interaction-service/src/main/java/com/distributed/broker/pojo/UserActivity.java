package com.distributed.broker.pojo;

import com.fasterxml.jackson.annotation.JsonProperty;
import jdk.jfr.Name;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Date;

/**
 * @author RuchenLai
 * @createTime 2024-01-01 21:40:09
 * @description
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "user_activity")
public class UserActivity implements Serializable {
    @Id
    @JsonProperty("user_id")
    private String userId;
    @JsonProperty("first_click_time")
    @CreatedDate
    private Date firstClickTime;
    @JsonProperty("current_rate")
    private double currentRate;
    @JsonProperty("no_of_clicks")
    private int noOfClicks;

}
