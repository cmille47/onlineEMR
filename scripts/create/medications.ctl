load data infile 'data/medications.csv'
insert into table medications
fields terminated by ','
(patient_id,medication,active)