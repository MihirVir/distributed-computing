package com.distributed.broker.repository;

import com.distributed.broker.pojo.Flight;
import com.distributed.broker.pojo.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderRepository extends MongoRepository<Order, String> {
}
