package com.alagarbaa.clickshop.dao;

import com.alagarbaa.clickshop.entity.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface StateDao extends JpaRepository<State, Integer> {

    List<State> findByCountryCode(@Param("code") String code);

}
