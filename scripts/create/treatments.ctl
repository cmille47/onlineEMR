load data infile 'data/treatments1.csv'
insert into table treatments
fields terminated by ','
(treatment_id,patient_id,visit_id,treatment_type,keyword_desc,duration,success)