drop table users cascade constraints;

create table users (
    uname varchar(20),
    pword varchar(20),
    constraint users_pk primary key (uname)
);
