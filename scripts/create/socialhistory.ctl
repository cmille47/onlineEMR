load data infile 'data/socialhistory1.csv'
insert into table socialhistory
fields terminated by ','
(patient_id,marriage,occupation,exercise,alcohol,smoking)