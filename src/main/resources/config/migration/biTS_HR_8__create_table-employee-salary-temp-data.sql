create table IF NOT EXISTS EMPLOYEE_SALARY_TEMP_DATA
(
    ID                                 BIGINT not null,
    MONTH                              VARCHAR(255),
    YEAR                               INT,
    MAIN_GROSS_SALARY                  DOUBLE PRECISION,
    MAIN_GROSS_BASIC_SALARY            DOUBLE PRECISION,
    MAIN_GROSS_HOUSE_RENT              DOUBLE PRECISION,
    MAIN_GROSS_MEDICAL_ALLOWANCE       DOUBLE PRECISION,
    MAIN_GROSS_CONVEYANCE_ALLOWANCE    DOUBLE PRECISION,
    ABSENT_DAYS                        INT,
    FRACTION_DAYS                      INT,
    PAYABLE_GROSS_SALARY               DOUBLE PRECISION,
    PAYABLE_GROSS_BASIC_SALARY         DOUBLE PRECISION,
    PAYABLE_GROSS_HOUSE_RENT           DOUBLE PRECISION,
    PAYABLE_GROSS_MEDICAL_ALLOWANCE    DOUBLE PRECISION,
    PAYABLE_GROSS_CONVEYANCE_ALLOWANCE DOUBLE PRECISION,
    ARREAR_SALARY                      DOUBLE PRECISION,
    PF_DEDUCTION                       DOUBLE PRECISION,
    TAX_DEDUCTION                      DOUBLE PRECISION,
    WELFARE_FUND_DEDUCTION             DOUBLE PRECISION,
    MOBILE_BILL_DEDUCTION              DOUBLE PRECISION,
    OTHER_DEDUCTION                    DOUBLE PRECISION,
    TOTAL_DEDUCTION                    DOUBLE PRECISION,
    NET_PAY                            DOUBLE PRECISION,
    REMARKS                            VARCHAR(255),
    PF_CONTRIBUTION                    DOUBLE PRECISION,
    GF_CONTRIBUTION                    DOUBLE PRECISION,
    PROVISION_FOR_FESTIVAL_BONUS       DOUBLE PRECISION,
    PROVISION_FOR_LEAVE_ENCASHMENT     DOUBLE PRECISION,
    PROVISHION_FOR_PROJECT_BONUS       DOUBLE PRECISION,
    LIVING_ALLOWANCE                   DOUBLE PRECISION,
    OTHER_ADDITION                     DOUBLE PRECISION,
    SALARY_ADJUSTMENT                  DOUBLE PRECISION,
    PROVIDENT_FUND_ARREAR              DOUBLE PRECISION,
    ENTERTAINMENT                      DOUBLE PRECISION,
    UTILITY                            DOUBLE PRECISION,
    EMPLOYEE_ID                        BIGINT,
    constraint PK_EMPLOYEE_SALARY_TEMP_DATA
        primary key (ID),
    constraint FK_EMPLOYEE_SALARY_TEMP_DATA_EMPLOYEE_ID
        foreign key (EMPLOYEE_ID) references EMPLOYEE (ID)
);

