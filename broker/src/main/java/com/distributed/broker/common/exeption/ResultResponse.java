package com.distributed.broker.common.exeption;


import lombok.Getter;
import lombok.Setter;
import org.json.simple.JSONObject;

import java.util.Map;

/**
 * @author RuchenLai
 * @createTime 2023-12-31 05:41:50
 * @description
 */
public class ResultResponse {
    /**
     * response code
     */
    @Getter
    private String code;

    /**
     * response message
     */
    @Getter
    private String message;

    /**
     * result
     */
    @Setter
    private Object data;

    public ResultResponse() {
    }

    public ResultResponse(BaseErrorInfoInterface errorInfo) {
        this.code = errorInfo.getResultCode();
        this.message = errorInfo.getResultMsg();
    }

    public void setCode(String code) {
        this.code = code;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getResult() {
        return data;
    }

    public void setResult(Object data) {
        this.data = data;
    }

    /**
     * success
     *
     * @return
     */
    public static ResultResponse success() {
        return success(null);
    }

    /**
     * success
     * @param data
     * @return
     */
    public static ResultResponse success(Object data) {
        ResultResponse rb = new ResultResponse();
        rb.setCode(ExceptionEnum.SUCCESS.getResultCode());
        rb.setMessage(ExceptionEnum.SUCCESS.getResultMsg());
        rb.setResult(data);
        return rb;
    }

    /**
     * failed
     */
    public static ResultResponse error(BaseErrorInfoInterface errorInfo) {
        ResultResponse rb = new ResultResponse();
        rb.setCode(errorInfo.getResultCode());
        rb.setMessage(errorInfo.getResultMsg());
        rb.setResult(null);
        return rb;
    }

    /**
     * failed
     */
    public static ResultResponse error(String code, String message) {
        ResultResponse rb = new ResultResponse();
        rb.setCode(code);
        rb.setMessage(message);
        rb.setResult(null);
        return rb;
    }

    /**
     * failed
     */
    public static ResultResponse error( String message) {
        ResultResponse rb = new ResultResponse();
        rb.setCode("-1");
        rb.setMessage(message);
        rb.setResult(null);
        return rb;
    }

    @Override
    public String toString() {
        return JSONObject.toJSONString((Map) this);
    }

}