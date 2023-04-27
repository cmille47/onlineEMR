load data infile 'data/preexistingconditions1.csv'
insert into table preexistingconditions
fields terminated by ','
(patient_id,condition)