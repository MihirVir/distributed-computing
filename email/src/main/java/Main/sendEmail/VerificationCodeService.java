package Main.sendEmail;

/**
 * ClassName VerificationCodeService
 * Package Main.sendEmail
 * Description:
 *
 * @Author: Lin
 * @Creat: 2023/12/31
 */
public interface VerificationCodeService {
    /**
     * Interface for verification code service operations
     */

        /**
         * Store a verification code associated with an email address
         *
         * @param email the email address associated with the verification code
         * @param code the verification code to store
         */
        void storeVerificationCode(String email, String code);

        /**
         * Verify a given code against the stored code for an email address
         *
         * @param email the email address to verify the code against
         * @param code the code to verify
         * @return true if the code is valid and matches the stored code, false otherwise
         */
        boolean verifyCode(String email, String code);
}
