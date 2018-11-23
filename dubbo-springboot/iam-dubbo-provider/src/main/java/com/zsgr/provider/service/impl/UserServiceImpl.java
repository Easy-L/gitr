package com.zsgr.provider.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.zsgr.api.entity.User;
import com.zsgr.api.service.UserService;
import com.zsgr.provider.dao.UserMapper;

public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserMapper userMapper;
	
	@Override
	public User getUser(String username) {
		return null;
	}

	@Override
	@Transactional(readOnly=true)
	public List<User> getAll() {
		List<User> users=userMapper.getAll();
		return users;
	}

	@Override
	public User getOne(Integer age) {
		User user=userMapper.getOne(age);
		return user;
	}

	@Override
	@Transactional(propagation=Propagation.REQUIRED)
	public void insert(User user) {
		userMapper.insert(user);
	}

	@Override
	public void update(User user) {
		userMapper.update(user);
	}

	@Override
	@Transactional
	public void delete(Integer id) {
		userMapper.delete(id);
	}

}
