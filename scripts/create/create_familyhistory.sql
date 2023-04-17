drop table familyhistory cascade constraints;

create table familyhistory (
    patient_id number
        constraint fam_patient_id_fk references patients (patient_id),
    affliction varchar(50),
    relative1 varchar(15),
    constraint familyhistory_pk primary key (patient_id, affliction)
);
