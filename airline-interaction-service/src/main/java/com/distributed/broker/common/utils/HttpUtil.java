package com.distributed.broker.common.utils;

import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;

/**
 * http request util
 *
 * @since 2020-03-25
 */
public class HttpUtil {
    /**
     * get
     *
     * @param url
     * @param params
     * @return
     */
    public static String get(String url, MultiValueMap<String, String> params) {
        return get(url, params, null);
    }

    /**
     * get
     *
     * @param url
     * @param params
     * @param headers
     * @return
     */
    public static String get(String url, MultiValueMap<String, String> params, MultiValueMap<String, String> headers) {
        return request(url, params, headers, HttpMethod.GET);
    }

    /**
     * post json
     *
     * @param url
     * @param params
     * @return
     */
    public static String post(String url, String jsonPayload) {
        //String apiUrl = "https://example.com/api/post";

        // JSON payload as a String
        //String jsonPayload = "{\"key1\":\"value1\",\"key2\":\"value2\"}";

        // Create HttpHeaders with Content-Type set to application/json
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        // Create an HttpEntity with the JSON payload and headers
        HttpEntity<String> requestEntity = new HttpEntity<>(jsonPayload, headers);

        // Create a RestTemplate instance
        RestTemplate restTemplate = new RestTemplate();

        // Send the POST request
        ResponseEntity<String> responseEntity = restTemplate.postForEntity(url, requestEntity, String.class);

        // Print the response
        System.out.println("Response Code: " + responseEntity.getStatusCode());
        System.out.println("Response Body: " + responseEntity.getBody());
        return responseEntity.getBody();
    }

    /**
     * post
     *
     * @param url
     * @param params
     * @param headers
     * @return
     */
    public static String post(String url, MultiValueMap<String, String> params, MultiValueMap<String, String> headers) {
        return request(url, params, headers, HttpMethod.POST);
    }

    /**
     * put
     *
     * @param url
     * @param params
     * @return
     */
    public static String put(String url, MultiValueMap<String, String> params) {
        return put(url, params, null);
    }

    /**
     * put
     *
     * @param url
     * @param params
     * @param headers
     * @return
     */
    public static String put(String url, MultiValueMap<String, String> params, MultiValueMap<String, String> headers) {
        return request(url, params, headers, HttpMethod.PUT);
    }

    /**
     * delete
     *
     * @param url
     * @param params
     * @return
     */
    public static String delete(String url, MultiValueMap<String, String> params) {
        return delete(url, params, null);
    }

    /**
     * delete
     *
     * @param url
     * @param params
     * @param headers
     * @return
     */
    public static String delete(String url, MultiValueMap<String, String> params, MultiValueMap<String, String> headers) {
        return request(url, params, headers, HttpMethod.DELETE);
    }

    /**
     * form request
     *
     * @param url
     * @param params
     * @param headers
     * @param method
     * @return
     */
    public static String request(String url, MultiValueMap<String, String> params, MultiValueMap<String, String> headers, HttpMethod method) {
        if (params == null) {
            params = new LinkedMultiValueMap<>();
        }
        return request(url, params, headers, method, MediaType.APPLICATION_FORM_URLENCODED);
    }

    /**
     * http
     *
     * @param url
     * @param params
     * @param headers
     * @param method
     * @param mediaType
     * @return
     */
    public static String request(String url, Object params, MultiValueMap<String, String> headers, HttpMethod method, MediaType mediaType) {
        if (url == null || url.trim().isEmpty()) {
            return null;
        }
        RestTemplate client = new RestTemplate();
        // header
        HttpHeaders httpHeaders = new HttpHeaders();
        if (headers != null) {
            httpHeaders.addAll(headers);
        }
        // 提交方式：表单、json
        httpHeaders.setContentType(mediaType);
        HttpEntity<Object> httpEntity = new HttpEntity(params, httpHeaders);
        ResponseEntity<String> response = client.exchange(url, method, httpEntity, String.class);
        return response.getBody();
    }
}
