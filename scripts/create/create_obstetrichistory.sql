drop table obstetrichistory cascade constraints;

create table obstetrichistory (
    patient_id number
        constraint obs_patient_id_fk references patients (patient_id),
    startdate varchar(20),
    enddate varchar(20),
    constraint obstetrichistory_pk primary key (patient_id, startdate)
);
