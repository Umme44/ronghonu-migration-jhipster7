package com.bits.hr.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class FinalSettlementMapperTest {

    private FinalSettlementMapper finalSettlementMapper;

    @BeforeEach
    public void setUp() {
        finalSettlementMapper = new FinalSettlementMapperImpl();
    }
}