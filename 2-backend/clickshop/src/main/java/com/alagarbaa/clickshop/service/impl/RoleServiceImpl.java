package com.alagarbaa.clickshop.service.impl;

import com.alagarbaa.clickshop.dao.RoleDao;
import com.alagarbaa.clickshop.entity.Role;
import com.alagarbaa.clickshop.service.RoleService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class RoleServiceImpl implements RoleService {

    private final RoleDao roleDao;

    public RoleServiceImpl(RoleDao roleDao) {
        this.roleDao = roleDao;
    }

    @Override
    public void createRole(String roleName) {
        roleDao.save(new Role(roleName));
    }
}
