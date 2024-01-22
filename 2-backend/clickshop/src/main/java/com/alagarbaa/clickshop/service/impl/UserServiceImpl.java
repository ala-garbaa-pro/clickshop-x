package com.alagarbaa.clickshop.service.impl;

import com.alagarbaa.clickshop.constant.UserRoleEnum;
import com.alagarbaa.clickshop.dao.RoleDao;
import com.alagarbaa.clickshop.dao.UserDao;
import com.alagarbaa.clickshop.entity.Role;
import com.alagarbaa.clickshop.entity.User;
import com.alagarbaa.clickshop.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final UserDao userDao;

    private final RoleDao roleDao;

    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserDao userDao, RoleDao roleDao, PasswordEncoder passwordEncoder) {
        this.userDao = userDao;
        this.roleDao = roleDao;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User loadUserByEmail(String email) {
        return userDao.findByEmail(email);
    }

    @Override
    public User loadUserByID(Long id) {
        return userDao.getReferenceById(id);
    }


    @Override
    public User createUser(String name, String email, String password) {
        System.out.println("createUser 1");

        String encodedPassword = passwordEncoder.encode(password);

        return userDao.save(new User(name, email, encodedPassword));
    }

    @Override
    public void updateUser(User existingUser, Map<String, Object> requestMap) {

        System.out.println("updateUser-->requestMap:: --------------------->" + requestMap);


        if (requestMap.containsKey("name")) {
            String name = (String) requestMap.get("name");
            if (!name.isEmpty()) {
                existingUser.setName(name);
            }
        }

        if (requestMap.containsKey("email")) {
            String newEmail = (String) requestMap.get("email");
            if (!newEmail.isEmpty()) {
                existingUser.setEmail(newEmail);
            }
        }

        if (requestMap.containsKey("password")) {
            String newPassword = (String) requestMap.get("password");
            if (!newPassword.isEmpty()) {
                String encodedPassword = passwordEncoder.encode(newPassword);
                existingUser.setPassword(encodedPassword);
            }
        }

        userDao.save(existingUser);


        if (requestMap.containsKey("roles") && existingUser.getUserId() != 1) {
            System.out.println("Updating roles...");

            // Remove all roles
            existingUser.getRoles().clear();

            // Add roles
            Object rolesObject = requestMap.get("roles");
            if (rolesObject instanceof List) {
                List<String> roleNames = (List<String>) rolesObject;
                System.out.println("Received role names: " + roleNames);

                for (String roleName : roleNames) {
                    Role role = roleDao.findByName(roleName);
                    if (role != null) {
                        existingUser.getRoles().add(role);
                    }
                }

                userDao.save(existingUser);
                System.out.println("User roles updated.");
            }
        }




    }


    @Override
    public void assignRoleToUser(String email, String roleName) {
        User user = loadUserByEmail(email);
        Role role = roleDao.findByName(roleName);
        if (user != null && role != null) {
            user.assignRoleToUser(role);
            userDao.save(user);
        } else {
            throw new IllegalArgumentException("User or Role not found");
        }
    }

    @Override
    public void removeRoleFromUser(String email, String role) {
        User user = loadUserByEmail(email);
        Role roleToRemove = roleDao.findByName(role);
        if (user != null && roleToRemove != null) {
            user.removeRoleFromUser(roleToRemove);
            userDao.save(user);
        }
    }

    @Override
    public Set<Role> getUserRoles(String email) {
        User user = loadUserByEmail(email);
        if (user != null) {
            return user.getRoles();
        }
        return null;
    }

    public Page<User> getUsersWithPagination(Pageable pageable) {
        return userDao.findAll(pageable);
    }

}
