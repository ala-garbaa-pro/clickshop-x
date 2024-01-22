package com.alagarbaa.clickshop.helper;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class CredentialsJWTObject {
    private String email;
    private Long userId;


    // Default constructor
    public CredentialsJWTObject() {
    }

    public CredentialsJWTObject(String email, Long userId) {
        this.email = email;
        this.userId = userId;
    }

    // Getters and setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "{" +
                "\"email\": \"" + email + "\"," +
                "\"userId\": " + userId +
                "}";
    }

    // Serialize the object to a JSON string
    public String serialize() throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(this);
    }

    // Deserialize a JSON string to an object
    public static CredentialsJWTObject deserialize(String jsonString) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(jsonString, CredentialsJWTObject.class);
    }
}
