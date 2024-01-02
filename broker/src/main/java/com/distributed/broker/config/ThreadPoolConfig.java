package com.distributed.broker.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.ThreadPoolExecutor;

/**
 * @author RuchenLai
 * @createTime 2024-01-01 20:25:23
 * @description
 */
@Configuration
public class ThreadPoolConfig
{

    /**
     *   默认情况下，在创建了线程池后，线程池中的线程数为0，当有任务来之后，就会创建一个线程去执行任务，
     *  当线程池中的线程数目达到corePoolSize后，就会把到达的任务放到缓存队列当中；
     *  当队列满了，就继续创建线程，当线程数量大于等于maxPoolSize后，开始使用拒绝策略拒绝
     */

    @Value("${async.executor.thread.core_pool_size}")
    public static int corePoolSize;
    @Value("${async.executor.thread.max_pool_size}")
    public static int maxPoolSize;
    @Value("${async.executor.thread.queue_capacity}")
    public static int queueCapacity;
    @Value("${async.executor.thread.keep_alive_seconds}")
    public static int keepAliveSeconds;
    @Value("${async.executor.thread.thread_name_prefix}")
    private static String threadNamePrefix;

    @Bean
    public ThreadPoolTaskExecutor threadPoolTaskExecutor()
    {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setMaxPoolSize(10);
        executor.setCorePoolSize(3);
        executor.setQueueCapacity(100);
        executor.setKeepAliveSeconds(300);
        executor.setThreadNamePrefix("Async-Service-");
        //reject strategy (no thread is capable)
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
        executor.initialize();
        return executor;
    }

}