package com.alagarbaa.clickshop.web;

import com.alagarbaa.clickshop.dao.UserDao;
import com.alagarbaa.clickshop.dto.UserDto;
import com.alagarbaa.clickshop.dto.UserPageDto;
import com.alagarbaa.clickshop.entity.Role;
import com.alagarbaa.clickshop.entity.User;
import com.alagarbaa.clickshop.helper.CredentialsJWTObject;
import com.alagarbaa.clickshop.helper.JWTHelper;
import com.alagarbaa.clickshop.service.UserService;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import static com.alagarbaa.clickshop.constant.JWTUtil.*;

@CrossOrigin(origins = CORS_ORIGINS)
@RestController
public class UserRestController {

    private final Logger logger = LoggerFactory.getLogger(getClass());

    private final UserService userService;

    private final JWTHelper jwtHelper;

    public UserRestController(UserService userService, JWTHelper jwtHelper) {
        this.userService = userService;
        this.jwtHelper = jwtHelper;
    }

    @GetMapping("/get-user")
    @PreAuthorize("hasAuthority('SUPER_ADMIN_ROLE')")
    public ResponseEntity<?> getUser(@RequestParam long userId) {
        User theUser = userService.loadUserByID(userId);

        if (theUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        UserDto userDTO = new UserDto(theUser.getUserId(), theUser.getEmail(), theUser.getPassword(), theUser.getName(), theUser.getRoles());

        return ResponseEntity.ok(userDTO);
    }

    @GetMapping("/list-users")
    @PreAuthorize("hasAuthority('SUPER_ADMIN_ROLE')")
    public ResponseEntity<UserPageDto> listUsers(@RequestParam(defaultValue = "0") int page,
                                                 @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<User> usersPage = userService.getUsersWithPagination(pageable);

        List<UserDto> userDtos = usersPage.getContent().stream()
                .map(user -> new UserDto(user.getUserId(), user.getEmail(), user.getPassword(), user.getName(), user.getRoles()))
                .collect(Collectors.toList());

        UserPageDto userPageDto = new UserPageDto();
        userPageDto.setUsers(userDtos);
        userPageDto.setTotalPages(usersPage.getTotalPages());
        userPageDto.setTotalElements(usersPage.getTotalElements());
        userPageDto.setSize(usersPage.getSize());
        userPageDto.setNumber(usersPage.getNumber());

        return ResponseEntity.ok(userPageDto);
    }

    @PostMapping("/create-user")
    @PreAuthorize("hasAuthority('SUPER_ADMIN_ROLE')")
    public ResponseEntity<UserDto> createUser(@RequestBody Map<String, Object> requestMap) {
        logger.info("createUser() called");
        String name = (String) requestMap.get("name");
        String email = (String) requestMap.get("email");
        String password = (String) requestMap.get("password");
        List<String> roles = (List<String>) requestMap.get("roles");

        logger.info("User: {}, {}, {}, {}", name, email, password, roles);

        try {
            if (name != null && email != null && password != null) {
                User createdUser = userService.createUser(name, email, password);

                if (roles != null && !roles.isEmpty()) {
                    for (String roleName : roles) {
                        if (roleName != null && !roleName.isEmpty()) {
                            userService.assignRoleToUser(createdUser.getEmail(), roleName);
                        }
                    }
                }

                // Convert User to UserDto
                UserDto userDTO = new UserDto(createdUser.getUserId(), createdUser.getEmail(), createdUser.getPassword(), createdUser.getName(), roles);

                logger.info("User created: {}", userDTO.toString());
                return ResponseEntity.status(HttpStatus.CREATED).body(userDTO);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            logger.error("An error occurred: ", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update-user")
    @PreAuthorize("hasAuthority('SUPER_ADMIN_ROLE')")
    public ResponseEntity<UserDto> updateUser(@RequestParam long userId, @RequestBody Map<String, Object> requestMap) {
        logger.info("updateUser() called");

        User existingUser = userService.loadUserByID(userId);

        if (existingUser == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        try {
            userService.updateUser(existingUser, requestMap);

            // Convert User to UserDto
            UserDto userDTO = new UserDto(existingUser.getUserId(), existingUser.getEmail(), existingUser.getPassword(), existingUser.getName(), existingUser.getRoles());

            logger.info("User updated: {}", userDTO.toString());
            return ResponseEntity.ok(userDTO);
        } catch (Exception e) {
            logger.error("An error occurred: ", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping("/users/{email}/assign-one-role")
    @PreAuthorize("hasAuthority('SUPER_ADMIN_ROLE')")
    public ResponseEntity<String> assignOneRoleToUser(@PathVariable String email, @RequestBody Map<String, String> requestPayload) {
        try {
            User user = userService.loadUserByEmail(email);
            if (user == null) {
                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
            }

            String roleName = requestPayload.get("roleName"); // Extract the role name from the JSON payload

            if (roleName == null || roleName.isEmpty()) {
                return new ResponseEntity<>("Role name not provided", HttpStatus.BAD_REQUEST);
            }

            System.out.println("roleName --> " + roleName);

            userService.assignRoleToUser(user.getEmail(), roleName); // Delegate to the service layer

            return new ResponseEntity<>("Role assigned successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error assigning role: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping("/users/{email}/assign-roles")
    @PreAuthorize("hasAuthority('SUPER_ADMIN_ROLE')")
    public ResponseEntity<String> assignRolesToUser(@PathVariable String email, @RequestBody Map<String, List<String>> requestPayload) {
        try {
            User user = userService.loadUserByEmail(email);
            if (user == null) {
                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
            }

            List<String> roles = requestPayload.get("roles"); // Extract the roles from the JSON payload

            if (roles == null || roles.isEmpty()) {
                return new ResponseEntity<>("Roles not provided", HttpStatus.BAD_REQUEST);
            }

            for (String roleName : roles) {
                if (roleName == null || roleName.isEmpty()) {
                    return new ResponseEntity<>("Invalid role name provided", HttpStatus.BAD_REQUEST);
                }

                System.out.println("roleName --> " + roleName);

                userService.assignRoleToUser(user.getEmail(), roleName); // Delegate to the service layer
            }

            return new ResponseEntity<>("Roles assigned successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error assigning roles: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping("/users/{email}/update-roles")
    @PreAuthorize("hasAuthority('SUPER_ADMIN_ROLE')")
    public ResponseEntity<String> updateRolesForUser(@PathVariable String email, @RequestBody Map<String, List<String>> requestPayload) {
        try {
            User user = userService.loadUserByEmail(email);
            if (user == null) {
                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
            }

            System.out.println("user OK --> " + user);

            // Get existing roles in the database
            Set<Role> existingRolesDB = userService.getUserRoles(user.getEmail());

            List<String> newRoles = requestPayload.get("roles"); // Extract the new roles from the JSON payload

            if (newRoles == null || newRoles.isEmpty()) {
                return new ResponseEntity<>("New roles not provided", HttpStatus.BAD_REQUEST);
            }

            // Check if the user is the first admin (id == 1) and keep the SUPER_ADMIN_ROLE
            if (user.getUserId() != 1 && !existingRolesDB.contains("SUPER_ADMIN_ROLE")) {
                userService.removeRoleFromUser(user.getEmail(), "SUPER_ADMIN_ROLE");
            }

            Set<String> existingRoles = existingRolesDB.stream().map(Role::getName).collect(Collectors.toSet());

            // Remove roles that don't exist in the new roles
            for (String existingRole : existingRoles) {
                if (!newRoles.contains(existingRole)) {
                    userService.removeRoleFromUser(user.getEmail(), existingRole);
                    System.out.println("Remove roles that don't exist in the new roles:: existingRole --> " + existingRole);
                }
            }

            // Add new roles
            for (String newRole : newRoles) {
                if (!existingRoles.contains(newRole)) {
                    userService.assignRoleToUser(user.getEmail(), newRole);
                    System.out.println("Add new roles:: newRole --> " + newRole);
                }
            }

            return new ResponseEntity<>("Roles updated successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error updating roles: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/check-if-email-exists")
    @PreAuthorize("hasAuthority('SUPER_ADMIN_ROLE')")
    public boolean checkIfEmailExists(@RequestParam(name = "email", defaultValue = "") String email) {
//        System.out.println("email --> = " + email);
        return userService.loadUserByEmail(email) != null;
    }

    @GetMapping("/refresh-token")
    public void generateNewAccessToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String jwtRefreshToken = jwtHelper.extractTokenFromHeaderIfExists(request.getHeader(AUTH_HEADER));
        if (jwtRefreshToken != null) {
            Algorithm algorithm = Algorithm.HMAC256(SECRET);
            JWTVerifier jwtVerifier = JWT.require(algorithm).build();
            DecodedJWT decodedJWT = jwtVerifier.verify(jwtRefreshToken);

            String encryptedJSON = decodedJWT.getSubject();

            // Deserialize the JSON string
            CredentialsJWTObject credentialsJWTObject = CredentialsJWTObject.deserialize(encryptedJSON);

            // Now you can access the properties of the deserialized object
            String email = credentialsJWTObject.getEmail();

            User user = userService.loadUserByEmail(email);
            String jwtAccessToken = jwtHelper.generateAccessToken(user.getEmail(), user.getRoles().stream().map(Role::getName).collect(Collectors.toList()));
            response.setContentType("application/json");
            new ObjectMapper().writeValue(response.getOutputStream(), jwtHelper.getTokensMap(jwtAccessToken, jwtRefreshToken));
        } else {
            throw new RuntimeException("Refresh token required");
        }
    }


}

