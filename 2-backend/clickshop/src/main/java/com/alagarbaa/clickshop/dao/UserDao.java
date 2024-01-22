package com.alagarbaa.clickshop.dao;

import com.alagarbaa.clickshop.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

public interface UserDao extends JpaRepository<User, Long> {

    User findByEmail(String email);

    Page<User> findAll(Pageable pageable);

}
