package com.distributed.broker.repository;

import com.distributed.broker.pojo.UserActivity;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserActivityRepository  extends MongoRepository<UserActivity, String> {
}
