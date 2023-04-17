drop table socialhistory cascade constraints;

create table socialhistory (
    patient_id number
        constraint soc_patient_id_fk references patients (patient_id),
    marriage char(1),       -- Store 'Y' or 'N'
    occupation varchar(20),
    excercise char(1),       -- Store 'Y' or 'N'
    alcohol char(1),        -- Store 'Y' or 'N'
    smoking char(1),        -- Store 'Y' or 'N'
    constraint socialhistory_pk primary key (patient_id)
);
