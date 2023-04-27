load data infile 'data/medications1.csv'
insert into table medications
fields terminated by ','
(patient_id,medication,active)