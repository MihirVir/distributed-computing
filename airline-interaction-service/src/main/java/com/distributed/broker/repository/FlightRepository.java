package com.distributed.broker.repository;

import com.distributed.broker.pojo.Flight;
import org.springframework.data.mongodb.repository.MongoRepository;
public interface FlightRepository extends MongoRepository<Flight, String>{

}