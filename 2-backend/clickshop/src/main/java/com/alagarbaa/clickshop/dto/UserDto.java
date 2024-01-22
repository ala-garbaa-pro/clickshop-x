package com.alagarbaa.clickshop.dto;

import com.alagarbaa.clickshop.entity.Role;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class UserDto {

    private Long userId; // Adding userId
    private String email;
    private String password;
    private String name;
    private List<String> roles;

    public UserDto() {
    }

    public UserDto(Long userId, String email, String password, String name, List<String> roles) {
        this.userId = userId;
        this.email = email;
        this.password = password;
        this.name = name;
        this.roles = roles;
    }

    public UserDto(Long userId, String email, String password, String name, Set<Role> roles) {
        this.userId = userId;
        this.email = email;
        this.password = password;
        this.name = name;
        this.roles = roles.stream()
                .map(Role::getName)
                .collect(Collectors.toList());
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    @Override
    public String toString() {
        return "UserDto{" +
                "userId=" + userId +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", roles=" + roles +
                '}';
    }
}
