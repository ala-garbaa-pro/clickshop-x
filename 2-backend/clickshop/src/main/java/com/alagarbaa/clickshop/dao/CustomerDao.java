package com.alagarbaa.clickshop.dao;

import com.alagarbaa.clickshop.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

public interface CustomerDao extends JpaRepository<Customer, Long> {

    Customer findByEmail(String email);

}
