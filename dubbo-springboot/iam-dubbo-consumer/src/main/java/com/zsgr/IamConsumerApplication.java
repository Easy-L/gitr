package com.zsgr;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import com.alibaba.dubbo.config.spring.context.annotation.EnableDubbo;

@EnableDubbo
@EnableCaching
@SpringBootApplication(scanBasePackages={"com.zsgr"})
public class IamConsumerApplication {
	public static void main(String[] args) {
        SpringApplication.run(IamConsumerApplication.class, args);
    }
}
