package Main.sendEmail;

public class MessageFormat {
    private String email;
    private String msg;
    private String subject;

    public MessageFormat(String email, String subject, String msg) {
        this.email = email;
        this.msg = msg;
        this.subject = subject;
    }

    public String getEmail() {
        return email;
    }
    public String getSubject() {
        return subject;
    }
    public String getMsg() {
        return msg;
    }

    public void setEmail(String email) { this.email = email; }
    public void setSubject(String subject) { this.subject = subject; }
    public void setMsg(String msg) { this.msg = msg; }
}
