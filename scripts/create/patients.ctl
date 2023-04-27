load data infile 'data/patients1.csv'
insert into table patients
fields terminated by ','
(patient_id,first_name,last_name,dob,gender,race,pref_language,phone,street1,street2,city,state,zip)