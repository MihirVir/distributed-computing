package Main.sendEmail;

import javax.mail.MessagingException;

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
    void sendCustomEmail(String email, String subject, String msg) throws MessagingException;

}
