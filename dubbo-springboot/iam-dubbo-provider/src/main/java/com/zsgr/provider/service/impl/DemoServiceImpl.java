package com.zsgr.provider.service.impl;

import com.alibaba.dubbo.config.annotation.Service;
import com.zsgr.api.service.DemoService;


@Service
public class DemoServiceImpl implements DemoService {

    @Override
    public String sayHello(String name) {
        return "Hello, " + name + " (from Spring Boot)";
    }
}
