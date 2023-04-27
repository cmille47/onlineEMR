load data infile 'data/immunizations.csv'
insert into table immunizations
fields terminated by ','
(patient_id,immunization)