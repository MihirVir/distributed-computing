
import Main.EmailApplication;
import Main.sendEmail.MongoConfig;
import Main.sendEmail.VerificationCodeService;
import Main.sendEmail.VerificationCodeServiceImpl;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoDatabase;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(classes = EmailApplication.class)
@Import(MongoConfig.class)
public class VerificationCodeServiceTest {

    @Autowired
    private MongoClient mongoClient;

    private VerificationCodeService verificationCodeService;

    @BeforeEach
    void setUp() {
        MongoDatabase database = mongoClient.getDatabase("local");
        verificationCodeService = (VerificationCodeService) new VerificationCodeServiceImpl(database);
    }

    @Test
    void testStoreAndVerifyCode() {
        String testEmail = "test@example.com";
        String testCode = "12345";

        // 测试存储验证码功能
        verificationCodeService.storeVerificationCode(testEmail, testCode);

        // 测试验证正确的验证码
        assertTrue(verificationCodeService.verifyCode(testEmail, testCode),
                "Verification should succeed with correct code.");

        // 测试验证错误的验证码
        assertFalse(verificationCodeService.verifyCode(testEmail, "wrongCode"),
                "Verification should fail with incorrect code.");
    }

    // 添加更多测试...
}
