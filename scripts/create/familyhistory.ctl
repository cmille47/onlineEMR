load data infile 'data/familyhistory.csv'
insert into table familyhistory
fields terminated by ','
(patient_id,affliction,relative1)