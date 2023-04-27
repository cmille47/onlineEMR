sqlplus -S boss/boss @create/create_all
sqlldr boss/boss control=create/doctors.ctl
sqlldr boss/boss control=create/patients.ctl
sqlldr boss/boss control=create/familyhistory.ctl
sqlldr boss/boss control=create/immunizations.ctl
sqlldr boss/boss control=create/medications.ctl
sqlldr boss/boss control=create/obstetrichistory.ctl
sqlldr boss/boss control=create/preexistingconditions.ctl
sqlldr boss/boss control=create/socialhistory.ctl
sqlldr boss/boss control=create/visits.ctl
sqlldr boss/boss control=create/treatments.ctl
sqlldr boss/boss control=create/users.ctl