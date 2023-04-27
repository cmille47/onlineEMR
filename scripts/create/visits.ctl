load data infile 'data/visits.csv'
insert into table visits
fields terminated by ','
(patient_id,visit_id,visit_date,chief_complaint,visit_type,diagnosis,ref_patient_id,ref_visit_id,doctor_id,height,weight,notes)