drop table preexistingconditions cascade constraints;

create table preexistingconditions (
    patient_id number
        constraint pre_patient_id_fk references patients (patient_id),
    condition varchar(50),
    constraint preexistingconditions_pk primary key (patient_id, condition)
);
