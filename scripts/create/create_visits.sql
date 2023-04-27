drop table visits cascade constraints;

create table visits (
    patient_id number
        constraint vis_patient_id_fk references patients (patient_id),
    visit_id number,
    visit_date varchar(20),
    chief_complaint varchar(100),
    visit_type varchar(50),         -- eg. post-op, checkup, surgery, emergency, complication
    diagnosis varchar(50),          -- eg. wisdom teeth removal, infection, etc.
    ref_patient_id number,          -- NULL unless visit references prior visit
    ref_visit_id number,            -- NULL unless visit references prior visit
    doctor_id number
        constraint doctor_id_pk references doctors (doctor_id),
    height varchar(10),
    weight number,
    notes varchar(150),
    constraint visits_pk primary key (patient_id, visit_id)
);

alter table visits add constraint visit_id_pk foreign key (ref_patient_id, ref_visit_id) references visits (patient_id, visit_id);
