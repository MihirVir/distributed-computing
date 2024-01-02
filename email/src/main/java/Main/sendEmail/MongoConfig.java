package Main.sendEmail;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * ClassName MongoConfig
 * Package Main.sendEmail
 * Description:
 *
 * @Author: Lin
 * @Creat: 2023/12/31
 */
@Configuration
public class MongoConfig {
        @Bean
        public MongoClient mongoClient() {
            // connect to MongoDB
            return MongoClients.create("mongodb://mongo-cluster-ip-service:27017");
        }

        @Bean
        public MongoDatabase mongoDatabase(MongoClient mongoClient) {
            return mongoClient.getDatabase("email");
        }
}
