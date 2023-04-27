load data infile 'data/socialhistory.csv'
insert into table socialhistory
fields terminated by ','
(patient_id,marriage,occupation,exercise,alcohol,smoking)