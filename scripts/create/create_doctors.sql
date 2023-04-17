drop table doctors cascade constraints;

create table doctors (
    doctor_id number,
    first_name varchar(20),
    last_name varchar(20),
    constraint doctors_pk primary key (doctor_id)
);
