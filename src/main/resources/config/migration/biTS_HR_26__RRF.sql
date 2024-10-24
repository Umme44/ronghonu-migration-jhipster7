CREATE TABLE IF NOT EXISTS RECRUITMENT_REQUISITION_FORM
(
    ID                        BIGINT       NOT NULL,
    EXPECTED_JOINING_DATE     DATE         NOT NULL,
    PROJECT                   VARCHAR(250),
    NUMBER_OF_VACANCIES       INT          NOT NULL,
    EMPLOYMENT_TYPE           VARCHAR(255) NOT NULL,
    RESOURCE_TYPE             VARCHAR(255) NOT NULL,
    RRF_NUMBER                VARCHAR(255),
    PREFERRED_EDUCATION_TYPE  VARCHAR(250),
    DATE_OF_REQUISITION       DATE,
    REQUESTED_DATE            DATE,
    RECOMMENDATION_DATE_01    DATE,
    RECOMMENDATION_DATE_02    DATE,
    RECOMMENDATION_DATE_03    DATE,
    RECOMMENDATION_DATE_04    DATE,
    FUNCTIONAL_DESIGNATION_ID BIGINT       NOT NULL,
    BAND_ID                   BIGINT       NOT NULL,
    DEPARTMENT_ID             BIGINT,
    UNIT_ID                   BIGINT,
    RECOMMENDED_BY01_ID       BIGINT,
    RECOMMENDED_BY02_ID       BIGINT,
    RECOMMENDED_BY03_ID       BIGINT,
    RECOMMENDED_BY04_ID       BIGINT,
    CONSTRAINT PK_RECRUITMENT_REQUISITION_FORM
        PRIMARY KEY (ID),
    CONSTRAINT FK_RECRUITMENT_REQUISITION_FORM_BAND_ID
        FOREIGN KEY (BAND_ID) REFERENCES BAND (ID),
    CONSTRAINT FK_RECRUITMENT_REQUISITION_FORM_DEPARTMENT_ID
        FOREIGN KEY (DEPARTMENT_ID) REFERENCES DEPARTMENT (ID),
    CONSTRAINT FK_RECRUITMENT_REQUISITION_FORM_FUNCTIONAL_DESIGNATION_ID
        FOREIGN KEY (FUNCTIONAL_DESIGNATION_ID) REFERENCES DESIGNATION (ID),
    CONSTRAINT FK_RECRUITMENT_REQUISITION_FORM_RECOMMENDED_BY01_ID
        FOREIGN KEY (RECOMMENDED_BY01_ID) REFERENCES EMPLOYEE (ID),
    CONSTRAINT FK_RECRUITMENT_REQUISITION_FORM_RECOMMENDED_BY02_ID
        FOREIGN KEY (RECOMMENDED_BY02_ID) REFERENCES EMPLOYEE (ID),
    CONSTRAINT FK_RECRUITMENT_REQUISITION_FORM_RECOMMENDED_BY03_ID
        FOREIGN KEY (RECOMMENDED_BY03_ID) REFERENCES EMPLOYEE (ID),
    CONSTRAINT FK_RECRUITMENT_REQUISITION_FORM_RECOMMENDED_BY04_ID
        FOREIGN KEY (RECOMMENDED_BY04_ID) REFERENCES EMPLOYEE (ID),
    CONSTRAINT FK_RECRUITMENT_REQUISITION_FORM_UNIT_ID
        FOREIGN KEY (UNIT_ID) REFERENCES UNIT (ID)
);

ALTER TABLE EMPLOYEE
    ADD COLUMN CURRENT_IN_TIME                 TIMESTAMP DEFAULT NULL,
    ADD COLUMN CURRENT_OUT_TIME                TIMESTAMP DEFAULT NULL,
    ADD COLUMN ONLINE_ATTENDANCE_SANCTIONED_AT TIMESTAMP DEFAULT NULL;

ALTER TABLE MOVEMENT_ENTRY
    ADD COLUMN NOTE VARCHAR(250);

ALTER TABLE MANUAL_ATTENDANCE_ENTRY
    ADD COLUMN NOTE VARCHAR(250);

ALTER TABLE ATTENDANCE_ENTRY
    ADD COLUMN NOTE VARCHAR(250);

