drop table treatments cascade constraints;

create table treatments (
    treatment_id number,
    patient_id  number,
        -- constraint tre_patient_id_pk references patients (patient_id),
    visit_id number,
    treatment_type varchar(50),       -- procedure or prescription
    keyword_desc varchar(50),       -- operation or drug name
    duration varchar(20),
    success char(4),
    constraint treatments_pk primary key (treatment_id),
    constraint tre_visit_id_pk foreign key (patient_id, visit_id) references visits (patient_id, visit_id)
);
