package com.alagarbaa.clickshop.dao;

import com.alagarbaa.clickshop.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

public interface RoleDao extends JpaRepository<Role, Long> {

    Role findByName(String name);
}
