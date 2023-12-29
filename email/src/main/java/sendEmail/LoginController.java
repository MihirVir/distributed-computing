package sendEmail;

import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import sendEmail.SendCodeService;

import javax.mail.MessagingException;

/**
 * ClassName sendEmail.LoginController
 * Package PACKAGE_NAME
 * Description:
 *
 * @Author: Lin
 * @Creat: 2023/12/28
 */
public class LoginController {
    @Autowired
    SendCodeService sendCodeService;

//    @ApiOperation(value = "发送邮箱验证码", tags = "发送邮箱验证码")
//    @PostMapping("/email")
//    public void sendEMail(@RequestParam("param1") String email) throws MessagingException {
//        String code = Mail.achieveCode();
//        sendCodeService.sendEMail(email, code);
//    }
    @ApiOperation(value = "发送邮箱验证码", tags = "发送邮箱验证码")
    @GetMapping("/email")
    public void sendEMail(@RequestParam("param1") String email) throws MessagingException {
        String code = Mail.achieveCode();
        sendCodeService.sendEMail(email, code);
    }
}
