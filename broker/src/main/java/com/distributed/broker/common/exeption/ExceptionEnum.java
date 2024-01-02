package com.distributed.broker.common.exeption;

public enum ExceptionEnum implements BaseErrorInfoInterface{

    // 数据操作错误定义
    SUCCESS("200", "success"),
    BODY_NOT_MATCH("4001","requested data format does not match"),
    API_RESPONSE_EMPTY("4002","received result is empty"),
    UNKNOWN_ERROR("4003","unknown error"),
    RECORD_NOT_EXIST("4004","record is not exist"),
    INTERNAL_SERVER_ERROR("500", "server internal error");


    /**
     * error code
     */
    private final String resultCode;

    /**
     * error message
     */
    private final String resultMsg;

    ExceptionEnum(String resultCode, String resultMsg) {
        this.resultCode = resultCode;
        this.resultMsg = resultMsg;
    }

    @Override
    public String getResultCode() {
        return resultCode;
    }

    @Override
    public String getResultMsg() {
        return resultMsg;
    }
}