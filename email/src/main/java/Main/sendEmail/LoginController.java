package Main.sendEmail;

import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
@RestController
public class LoginController {
    @Autowired
    SendCodeService sendCodeService;

    @ApiOperation(value = "Send email verification code", tags = "Send email verification code")
    @PostMapping ("/email_code")
    public Response sendEMail(@RequestParam("email") String email) {
        String code = Mail.achieveCode();
        Response response = new Response();
        try {
            sendCodeService.sendEMail(email, code);
            response = new Response();
            response.setCode(code);
            response.setStatus(200);
            response.setMessage("code is ok");
            verificationCodeService.storeVerificationCode(email,code);
        } catch (MessagingException e) {
            e.printStackTrace();

            response.setCode(null);
            response.setStatus(400);
            response.setMessage(e.getMessage());
        }
        catch (Exception e) {
            e.printStackTrace();

            response.setCode(null);
            response.setStatus(400);
            response.setMessage(e.getMessage());
        } finally {
            return response;
        }

    }

    @Autowired
    VerificationCodeService verificationCodeService;

    @ApiOperation(value = "User login with email verification code", tags = "verify email verification code")
    @PostMapping("/verify_code")
    public Response login(@RequestParam("email") String email, @RequestParam("code") String code) {
        boolean isCodeValid = verificationCodeService.verifyCode(email, code);
        Response response = null;
        response = new Response();
        if (isCodeValid) {
            // 验证码正确 code is correct
            response.setStatus(HttpStatus.OK.value()); // 设置状态码为200
            response.setMessage("Verify successful");
            return response;

        } else {
            // 验证码错误或已过期
            response.setStatus(HttpStatus.BAD_REQUEST.value()); // 设置状态码为400
            response.setMessage("Invalid or expired verification code");
            return response;
        }
    }

}
