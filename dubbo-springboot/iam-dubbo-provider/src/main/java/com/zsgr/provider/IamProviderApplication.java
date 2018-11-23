package com.zsgr.provider;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.alibaba.dubbo.config.spring.context.annotation.EnableDubbo;

@EnableDubbo
@SpringBootApplication
public class IamProviderApplication {

	public static void main(String[] args) {
        SpringApplication.run(IamProviderApplication.class, args);
	}

}
