load data infile 'data/preexistingconditions.csv'
insert into table preexistingconditions
fields terminated by ','
(patient_id,condition)