load data infile 'data/doctors.csv'
insert into table doctors
fields terminated by ','
(doctor_id,first_name,last_name)