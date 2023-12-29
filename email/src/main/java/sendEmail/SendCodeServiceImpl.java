package sendEmail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import sendEmail.SendCodeService;

import javax.mail.MessagingException;
import java.util.concurrent.TimeUnit;

/**
 * ClassName sendEmail.SendCodeServiceImpl
 * Package PACKAGE_NAME
 * Description:
 *
 * @Author: Lin
 * @Creat: 2023/12/28
 */
public class SendCodeServiceImpl implements SendCodeService {
    public final Long CODE_TTL = 120L;
    @Autowired
    StringRedisTemplate redisTemplate;

    @Override
    public void sendEMail(String email, String code) throws MessagingException {
        // 1. 向用户发送验证码
            Mail.sendTestMail(email, code);
        // 2. 将验证码缓存到redis，TTL设置为2分钟
        redisTemplate.opsForValue().set(email, code, CODE_TTL, TimeUnit.SECONDS);
    }
}
