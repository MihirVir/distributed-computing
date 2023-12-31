package Main.sendEmail;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Properties;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

/**
 * ClassName Main.sendEmail.Mail
 * Package PACKAGE_NAME
 * Description:
 *
 * @Author: Lin
 * @Creat: 2023/12/28
 */
public class Mail {
    public static void main(String[] args) throws MessagingException {
        //可以在这里直接测试方法，填自己的邮箱即可
        //we can test the method directly here, just fill in your own email
        sendTestMail("yilinzhang0731@gmail.com", new Mail().achieveCode());
    }

    /**
     * 发送邮件
     * @param email 收件邮箱号 //recipient's email
     * @param code  验证码 //verification code
     * @throws MessagingException
     */
    public static void sendTestMail(String email, String code) throws MessagingException {
        // 创建Properties 类用于记录邮箱的一些属性
        // Create Properties class to keep email attributes
        Properties props = new Properties();
        // 表示SMTP发送邮件，必须进行身份验证
        // Indicates SMTP for sending mail, needs authentication
        props.put("mail.smtp.auth", "true");
        //此处填写SMTP服务器
        // Fill in the SMTP server here
        props.put("mail.smtp.host", "smtp.qq.com");
        //端口号，QQ邮箱端口587
        // Port number, QQ mail uses 587
        props.put("mail.smtp.port", "587");
        // 此处填写，写信人的账号
        // Fill in the sender's account here
        props.put("mail.user", "2842830122@qq.com");
        // 此处填写16位STMP口令
        // Fill in the 16-digit STMP token
        props.put("mail.password", "ofrugpjedziwdefg");
        // 构建授权信息，用于进行SMTP进行身份验证
        // Build authentication information for SMTP authentication
        Authenticator authenticator = new Authenticator() {
            protected javax.mail.PasswordAuthentication getPasswordAuthentication() {
                // 用户名、密码
                String userName = props.getProperty("mail.user");
                String password = props.getProperty("mail.password");
                return new PasswordAuthentication(userName, password);
            }
        };
        // 使用环境属性和授权信息，创建邮件会话
        // Create mail session with environment properties and authorization information
        Session mailSession = Session.getInstance(props, authenticator);
        // 创建邮件消息
        // Create mail message
        MimeMessage message = new MimeMessage(mailSession);
        // 设置发件人
        // Set sender
        InternetAddress form = new InternetAddress(props.getProperty("mail.user"));
        message.setFrom(form);
        // 设置收件人的邮箱
        // Set recipient's email
        InternetAddress to = new InternetAddress(email);
        message.setRecipient(Message.RecipientType.TO, to);
        // 设置邮件标题
        // Set email subject
        message.setSubject("LIN email test");
        // 设置邮件的内容体
        // Set email content body
        message.setContent(
                "Dear user: Hello!\nYour registration verification code is: " + code + " (valid for five minute, please do not disclose to others)", "text/html;charset=UTF-8");
        // 最后当然就是发送邮件啦
        // Finally, send the email

        Transport.send(message);
    }

    /**
     *  生成验证码
     * @return
     */
    public static String achieveCode() {  //由于数字 1 、 0 和字母 O 、l 有时分不清楚，所以，没有数字 1 、 0
        String[] beforeShuffle = new String[]{"2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F",
                "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a",
                "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v",
                "w", "x", "y", "z"};
        List<String> list = Arrays.asList(beforeShuffle);//将数组转换为集合
        Collections.shuffle(list);  //打乱集合顺序
        StringBuilder sb = new StringBuilder();
        for (String s : list) {
            sb.append(s); //将集合转化为字符串
        }
        return sb.substring(3, 8);
    }
}
