load data infile 'data/doctors1.csv'
insert into table doctors
fields terminated by ','
(doctor_id,first_name,last_name)