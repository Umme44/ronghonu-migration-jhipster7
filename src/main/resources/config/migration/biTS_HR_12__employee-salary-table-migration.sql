-- migration script for employee salary table
ALTER TABLE EMPLOYEE_SALARY
    DROP COLUMN PROVISHION_FOR_PROJECT_BONUS,
    DROP COLUMN LIVING_ALLOWANCE,
    ADD COLUMN ALLOWANCE_01 DOUBLE PRECISION DEFAULT 0,
    ADD COLUMN ALLOWANCE_02 DOUBLE PRECISION DEFAULT 0,
    ADD COLUMN ALLOWANCE_03 DOUBLE PRECISION DEFAULT 0,
    ADD COLUMN ALLOWANCE_04 DOUBLE PRECISION DEFAULT 0,
    ADD COLUMN ALLOWANCE_05 DOUBLE PRECISION DEFAULT 0,
    ADD COLUMN ALLOWANCE_06 DOUBLE PRECISION DEFAULT 0;
