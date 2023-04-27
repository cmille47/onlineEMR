load data infile 'data/obstetrichistory1.csv'
insert into table obstetrichistory
fields terminated by ','
(patient_id,startdate,enddate)