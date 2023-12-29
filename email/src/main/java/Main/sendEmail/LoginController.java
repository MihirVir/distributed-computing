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
