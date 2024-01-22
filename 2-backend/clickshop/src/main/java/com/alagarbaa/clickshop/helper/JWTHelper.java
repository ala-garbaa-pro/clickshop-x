package com.alagarbaa.clickshop.helper;

import com.alagarbaa.clickshop.dao.UserDao;
import com.alagarbaa.clickshop.entity.User;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;

import static com.alagarbaa.clickshop.constant.JWTUtil.*;

@Component
public class JWTHelper {

    @Autowired
    private UserDao userDao;

    Algorithm algorithm = Algorithm.HMAC256(SECRET);

    public String generateAccessToken(String email, List<String> roles) throws JsonProcessingException {
//        System.out.println("Date in UTC: " + new Date().toString());

        Date currentDate = new Date();
        Date expirationDate = new Date(currentDate.getTime() + EXPIRE_ACCESS_TOKEN);

//        System.out.println("Current Date: " + currentDate);
//        System.out.println("Token Expiration Date: " + expirationDate);

        User user = userDao.findByEmail(email);
        String dataToFrontend = new CredentialsJWTObject(email, user.getUserId()).serialize();

        return JWT.create()
                .withSubject(dataToFrontend)
                .withExpiresAt(expirationDate)
                .withIssuer(ISSUER)
                .withClaim("roles", roles)
                .sign(algorithm);
    }


    public String generateRefreshToken(String email) {

        User user = userDao.findByEmail(email);
        String dataToFrontend = new CredentialsJWTObject(email, user.getUserId()).toString();

        return JWT.create()
                .withSubject(dataToFrontend)
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRE_REFRESH_TOKEN))
                .withIssuer(ISSUER)
                .sign(algorithm);
    }

    public String extractTokenFromHeaderIfExists(String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith(BEARER_PREFIX)) {
            return authorizationHeader.substring(BEARER_PREFIX.length());
        }
        return null;
    }

    public Map<String, String> getTokensMap(String jwtAccessToken, String jwtRefreshToken) {
        Map<String, String> idTokens = new HashMap<>();
        idTokens.put("accessToken", jwtAccessToken);
        idTokens.put("refreshToken", jwtRefreshToken);
        return idTokens;
    }
}
