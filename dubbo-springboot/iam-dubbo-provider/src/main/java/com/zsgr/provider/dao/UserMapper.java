package com.zsgr.provider.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import com.zsgr.api.entity.User;

@Mapper
public interface UserMapper {

	List<User> getAll();
	
	User getOne(Integer id);
	
	void insert(User user);
	
	void update(User user);
	
	void delete(Integer id);

}
