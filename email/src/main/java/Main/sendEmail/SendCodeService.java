package Main.sendEmail;

import org.springframework.beans.factory.annotation.Autowired;
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
     * Send verify code to target mailbox
     *
     * @param email user email
     * @param code  verify code we sent
     */
    void sendEMail(String email, String code) throws MessagingException;


}
