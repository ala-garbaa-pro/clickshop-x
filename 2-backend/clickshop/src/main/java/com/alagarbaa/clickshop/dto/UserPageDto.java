package com.alagarbaa.clickshop.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
public class UserPageDto {

    @Setter
    private List<UserDto> users;

    @Getter
    @Setter
    private int totalPages;

    @Getter
    @Setter
    private long totalElements;


    @Getter
    @Setter
    private int size;

    @Getter
    @Setter
    private int number;

}