package com.alagarbaa.clickshop.runner;

import com.alagarbaa.clickshop.constant.UserRoleEnum;
import com.alagarbaa.clickshop.entity.User;
import com.alagarbaa.clickshop.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class MyRunner implements CommandLineRunner {

    @Autowired
    private RoleService roleService;

    @Autowired
    private UserService userService;

    @Override
    public void run(String... args) throws Exception {
        createRoles();
        createAdmin();
//        testListUsers();
    }

//    private void testListUsers() {
//        Page<User> users = userService.getUsersWithPagination(0, 10);
//        System.out.println("Users -------------------- >");
//
//        for (User user : users.getContent()) {
//            System.out.println("User ID: " + user.getUserId());
//            System.out.println("Name: " + user.getName());
//            System.out.println("Email: " + user.getEmail());
//            System.out.println("Password: " + user.getPassword());
//            System.out.println("Roles: " + user.getRoles());
//            // Print other relevant user information here
//            System.out.println("--------------------");
//        }
//
//        System.out.println("<-------------------- Users");
//    }

    private void createRoles() {
//        Arrays.asList("SUPER_ADMIN_ROLE", "STORE_MANAGER_ROLE", "CUSTOMER_ROLE").forEach(role -> roleService.createRole(role));
        Arrays.stream(UserRoleEnum.values())
                .map(UserRoleEnum::name)
                .forEach(roleName -> roleService.createRole(roleName));
    }

    private void createAdmin() {
        userService.createUser("Super Admin","admin@gmail.com", "1234");
        userService.assignRoleToUser("admin@gmail.com", UserRoleEnum.SUPER_ADMIN_ROLE.name());


        userService.createUser("Customer","customer@gmail.com", "1234");
        userService.assignRoleToUser("customer@gmail.com", UserRoleEnum.CUSTOMER_ROLE.name());
        userService.assignRoleToUser("customer@gmail.com", UserRoleEnum.STORE_MANAGER_ROLE.name());
        userService.assignRoleToUser("customer@gmail.com", UserRoleEnum.SUPER_ADMIN_ROLE.name());
        //
        userService.removeRoleFromUser("customer@gmail.com", UserRoleEnum.CUSTOMER_ROLE.name());


    }
}
