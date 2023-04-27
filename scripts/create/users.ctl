load data infile 'data/users.csv'
insert into table users
fields terminated by ','
(uname,pword)