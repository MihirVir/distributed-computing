package Main.sendEmail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.util.concurrent.TimeUnit;

/**
 * ClassName Main.sendEmail.SendCodeService
 * Package PACKAGE_NAME
 * Description:
 *
 * @Author: Lin
 * @Creat: 2023/12/28
 */
public interface SendCodeService {
    /**
     * 向目标邮箱发送验证码
     *
     * @param email 目标邮箱
     * @param code  我们发送的验证码
     */
    void sendEMail(String email, String code) throws MessagingException;


}
