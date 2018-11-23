package com.zsgr.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.zsgr.api.entity.User;
import com.zsgr.api.service.DemoService;
import com.zsgr.api.service.UserService;

@RestController
public class DemoConsumerController {

	@Autowired
    private DemoService demoService;
	
	@Autowired 
	private UserService userService;
	

    @RequestMapping("/sayHello/{name}")
    public String sayHello(@PathVariable("name") String name) {
        return demoService.sayHello(name);
    }
    
    @RequestMapping("/getUsers")
	public List<User> getUsers() {
		List<User> users=userService.getAll();
		return users;
	}

	

    @RequestMapping("/getUser")
    public User getUser() {
    	User user=userService.getOne(10);
        return user;
    }

    @RequestMapping("/add")
    public void save() {
    	User user=new User();
    	user.setAge(10);
    	user.setUsername("忘情号");
    	userService.insert(user);
    }

    @RequestMapping(value="/delete/{id}")
    public void delete(@PathVariable("id") Integer id) {
    	userService.delete(id);

    }
}
