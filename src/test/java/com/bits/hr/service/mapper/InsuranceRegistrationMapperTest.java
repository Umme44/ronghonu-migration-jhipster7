package com.bits.hr.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class InsuranceRegistrationMapperTest {

    private InsuranceRegistrationMapper insuranceRegistrationMapper;

    @BeforeEach
    public void setUp() {
        insuranceRegistrationMapper = new InsuranceRegistrationMapperImpl();
    }
}