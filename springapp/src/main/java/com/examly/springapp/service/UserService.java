package com.examly.springapp.service;

import com.examly.springapp.model.User;
import java.util.List;

public interface UserService {
    User createUser(User user);
    List<User> getAllUsers();
    void deleteUser(Long id);
}