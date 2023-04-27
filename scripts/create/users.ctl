load data infile 'data/users1.csv'
insert into table users
fields terminated by ','
(uname,pword)