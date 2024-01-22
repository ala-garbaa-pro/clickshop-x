package com.alagarbaa.clickshop.dto;

import com.alagarbaa.clickshop.entity.Address;
import com.alagarbaa.clickshop.entity.Customer;
import com.alagarbaa.clickshop.entity.Order;
import com.alagarbaa.clickshop.entity.OrderItem;

import lombok.Data;
import java.util.Set;

@Data
public class PurchaseDto {
    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}
