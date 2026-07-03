package com.examly.springapp.service;

import com.examly.springapp.entity.User;
import java.util.List;

public interface UserService {
    User createUser(User user);
    List<User> getAllUsers();
    void deleteUser(Long id);
}