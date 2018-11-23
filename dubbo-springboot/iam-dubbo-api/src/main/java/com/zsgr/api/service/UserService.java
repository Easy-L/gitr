package com.zsgr.api.service;

import java.util.List;

import com.zsgr.api.entity.User;

public interface UserService {
	public User getUser(String username);
	List<User> getAll();
	User getOne(Integer id);
	void insert(User user);
	void update(User user);
	void delete(Integer id);
}
