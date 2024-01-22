package com.alagarbaa.clickshop.service;

import com.alagarbaa.clickshop.entity.Role;
import com.alagarbaa.clickshop.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.Map;
import java.util.Set;

public interface UserService {

    User loadUserByEmail(String email);

    User loadUserByID(Long id);


    User createUser(String name, String email, String password);

    void updateUser(User existingUser, Map<String, Object> requestMap);

    void assignRoleToUser(String email, String roleName);

    void removeRoleFromUser(String email, String role);

    Set<Role> getUserRoles(String email);

    public Page<User> getUsersWithPagination(Pageable pageable);

}
