drop table socialhistory cascade constraints;

create table socialhistory (
    patient_id number
        constraint soc_patient_id_fk references patients (patient_id),
    marriage varchar(20),
    occupation varchar(20),
    excercise varchar(20),
    alcohol varchar(20),
    smoking varchar(20),
    constraint socialhistory_pk primary key (patient_id)
);
