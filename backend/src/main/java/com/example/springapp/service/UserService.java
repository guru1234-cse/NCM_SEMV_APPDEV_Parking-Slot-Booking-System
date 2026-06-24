package com.example.springapp.service;

import com.example.springapp.entity.User;
import java.util.List;

public interface UserService {

    User createUser(User user);

    List<User> getAllUsers();
}