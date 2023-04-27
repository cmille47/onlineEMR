load data infile 'data/familyhistory1.csv'
insert into table familyhistory
fields terminated by ','
(patient_id,affliction,relative1)