package Main.sendEmail;

import org.springframework.stereotype.Component;

@Component
public class Response {
    int status; // 400 is error, 200 is ok
    String code;
    String message;


    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
