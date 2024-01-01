package Main.sendEmail;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import com.mongodb.client.MongoDatabase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

/**
 * ClassName VerificationCodeServiceImpl
 * Package Main.sendEmail
 * Description:
 *
 * @Author: Lin
 * @Creat: 2023/12/31
 */
@Service
public class VerificationCodeServiceImpl implements VerificationCodeService{
    private MongoDatabase database;

    @Autowired
    public VerificationCodeServiceImpl(MongoDatabase database) {
        this.database = database;
    }


    public void storeVerificationCode(String email, String code) {
        MongoCollection<Document> collection = database.getCollection("verificationCodes");
        Document doc = new Document("email", email)
                .append("code", code)
                .append("createdAt", new Date());
        collection.insertOne(doc);
    }
    @Override
    public boolean verifyCode(String email, String code) {
        MongoCollection<Document> collection = database.getCollection("verificationCodes");
        Document doc = collection.find(new Document("email", email)).sort(new Document("createdAt", -1)).first();

        if (doc != null) {
            String storedCode = doc.getString("code");
            Date createdAt = doc.getDate("createdAt");
            if (storedCode.equals(code) && new Date().getTime() - createdAt.getTime() < 300000) {
                return true;
            }
        }
        return false;
    }
}
