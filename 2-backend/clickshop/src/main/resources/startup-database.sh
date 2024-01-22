docker stop clickshopv1_db
docker rm clickshopv1_db
docker run -d \
--name clickshopv1_db \
-e MYSQL_ROOT_PASSWORD=fs48azFZEfe8g4 \
-e MYSQL_DATABASE=clickshopv1_db_6957 \
-e MYSQL_USER=clickshopv1_user_6957 \
-e MYSQL_PASSWORD=f4Fegfeg8eg85 \
--restart always \
-p 25641:3306 \
mysql:8.0 --ssl-cipher=TLS_AES_256_GCM_SHA384