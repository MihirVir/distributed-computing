package Main.sendEmail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.util.concurrent.TimeUnit;

/**
 * ClassName SendCodeServiceImpl
 * Package Main.sendEmail
 * Description:
 *
 * @Author: Lin
 * @Creat: 2023/12/29
 */
@Service
public class SendCodeServiceImpl implements SendCodeService {
    public final Long CODE_TTL = 120L;

//    @Autowired
//    StringRedisTemplate redisTemplate;

    @Override
    public void sendEMail(String email, String code) throws MessagingException {
        // 1. 向用户发送验证码
        //Send verify code to the user
        Mail.sendTestMail(email, code);

        // 2. Cache verify code to redis, TTL set to 2 minutes
//        redisTemplate.opsForValue().set(email, code, CODE_TTL, TimeUnit.SECONDS);
    }

    @Override
    public void sendCustomEmail(String email, String subject, String msg) throws MessagingException {
        Mail.sendCustomMail(email, subject, msg);
    }    
}

