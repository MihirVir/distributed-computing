package com.distributed.broker.common.exeption;

/**
 * @author RuchenLai
 * @createTime 2023-12-31 05:38:25
 * @description
 */
public interface BaseErrorInfoInterface {

    /**
     *  error code
     * @return
     */
    String getResultCode();

    /**
     * error message
     * @return
     */
    String getResultMsg();
}