package Main.sendEmail;

import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;

/**
 * ClassName Main.Main.sendEmail.LoginController
 * Package PACKAGE_NAME
 * Description:
 *
 * @Author: Lin
 * @Creat: 2023/12/28
 */
@Controller
public class LoginController {
    @Autowired
    SendCodeService sendCodeService;

    @ApiOperation(value = "Send email verification code", tags = "Send email verification code")
    @PostMapping("/email")
    public String sendEMail(@RequestParam("param1") String email) {
        String code = Mail.achieveCode();
        try {
            sendCodeService.sendEMail(email, code);
            return "<div>successful sending </div>";
        } catch (MessagingException e) {
            e.printStackTrace();
            return "<div>Mail delivery failed. The following error occurs</div>" + e.getMessage();
        }
        catch (Exception e) {
            e.printStackTrace();
            return "<div>Mail delivery failed. The following error occurs：</div>" + e.getMessage();
        }
    }
    @Autowired
    VerificationCodeService verificationCodeService;

    @ApiOperation(value = "User login with email verification code", tags = "Login")
    @PostMapping("/login")
    public String login(@RequestParam("email") String email, @RequestParam("code") String code) {
        boolean isCodeValid = verificationCodeService.verifyCode(email, code);
        if (isCodeValid) {
            // 验证码正确
            // 处理登录逻辑，例如创建用户会话
            return "<div>Login successful</div>";
        } else {
            // 验证码错误或已过期
            return "<div>Invalid or expired verification code</div>";
        }
    }
//    @ResponseBody
//    @ApiOperation(value = "发送邮箱验证码", tags = "发送邮箱验证码")
//    @GetMapping("/email")
//    public String sendEMail(@RequestParam("param1") String email) {
//        String code = Mail.achieveCode();
//        try {
//            sendCodeService.sendEMail(email, code);
//            return "<div>发送成功</div>";
//        } catch (MessagingException e) {
//            e.printStackTrace();
//            return "<div>邮件发送失败.出现如下错误</div>" + e.getMessage();
//        }
//        catch (Exception e) {
//            e.printStackTrace();
//            return "<div>邮件发送成功.但是出现如下错误：</div>" + e.getMessage();
//        }
//    }
}
