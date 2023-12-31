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
            // 连接到 MongoDB 服务器 (默认是 localhost:27017)
            return MongoClients.create("mongodb://localhost:27017");
        }

        @Bean
        public MongoDatabase mongoDatabase(MongoClient mongoClient) {
            // 获取指定的数据库
            return mongoClient.getDatabase("local");
        }
}
