drop table patients cascade constraints;

create table patients (
    patient_id number,
    first_name varchar(20),
    last_name varchar(20),
    dob varchar(20),
    gender varchar(20),
    race varchar(20),
    pref_language varchar(20),
    phone varchar(20),
    street1 varchar(30),
    street2 varchar(30),
    city varchar(15),
    state varchar(20),
    zip char(7),
    constraint patients_pk primary key (patient_id)
);
