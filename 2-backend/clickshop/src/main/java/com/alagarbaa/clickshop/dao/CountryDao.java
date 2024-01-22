package com.alagarbaa.clickshop.dao;

import com.alagarbaa.clickshop.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "countries", path = "countries")
public interface CountryDao extends JpaRepository<Country, Integer> {
}
