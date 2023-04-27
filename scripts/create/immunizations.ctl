load data infile 'data/immunizations1.csv'
insert into table immunizations
fields terminated by ','
(patient_id,immunization)