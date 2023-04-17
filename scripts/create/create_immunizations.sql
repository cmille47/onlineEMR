drop table immunizations cascade constraints;

create table immunizations (
    patient_id number
        constraint imm_patient_id_fk references patients (patient_id),
    immunization varchar(50),
    constraint immunizations_pk primary key (patient_id, immunization)
);
