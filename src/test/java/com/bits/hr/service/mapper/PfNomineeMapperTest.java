package com.bits.hr.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class PfNomineeMapperTest {

    private PfNomineeMapper pfNomineeMapper;

    @BeforeEach
    public void setUp() {
        pfNomineeMapper = new PfNomineeMapperImpl();
    }
}
