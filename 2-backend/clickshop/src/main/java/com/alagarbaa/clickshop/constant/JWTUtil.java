package com.alagarbaa.clickshop.constant;

public class JWTUtil {

    // For Prod
//    public static final long EXPIRE_ACCESS_TOKEN = 15 * 60 * 1000;  // 15 minutes in milliseconds
//    public static final long EXPIRE_REFRESH_TOKEN = 7 * 24 * 60 * 60 * 1000; // 1 week in milliseconds


    // For Dev
    public static final long EXPIRE_ACCESS_TOKEN = 999999999;
    public static final long EXPIRE_REFRESH_TOKEN = 999999999;
    public static final String BEARER_PREFIX = "Bearer ";

    public static final String ISSUER = "ClickShopSpringBootAppRef54ef48xf";

    public static final String SECRET = "5ZPUwXxpGVzTrgE9XlRNh2nz8E3+hW5c=/5H6rf6bzSp";

    public static final String AUTH_HEADER = "Authorization";

    public static final String CORS_ORIGINS = "http://localhost:9411";
}
