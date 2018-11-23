package com.zsgr.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zsgr.config.RedisApp;

@RestController
@RequestMapping("/user")
public class UserController {
	@Autowired
	private RedisApp redisApp;
	@RequestMapping("/hello")
	public String home() {
		 redisApp.set("test:set", "testValue1");
         String test=(String) redisApp.get("test:set");
		return test;
	}
}
