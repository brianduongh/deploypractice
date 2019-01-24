drop database if exists justo;
create database justo;

use justo;

create table users(
	id integer auto_increment primary key,
    first_name varchar(255) not null,
    last_name varchar(255) not null,
    email varchar(255) unique not null,
    image varchar(255)
);

create table postings(
	id integer auto_increment primary key,
    posting_type varchar(255) default "",
    posting_desc varchar(255),
    posting_tags varchar(255),
    posting_complete boolean default false,
    posting_completion Date,
    posting_completion_deadline Date,
    posting_owner integer not null, foreign key(posting_owner) references users(id)
);

create table bids(
	id integer auto_increment primary key,
    employee_rate double not null,
    notes varchar(255) default "This person has nothing important to say :)",
    deadline Date,
    posting integer not null, foreign key(posting) references postings(id),
    employee integer not null, foreign key(employee) references users(id)
);

create table posting_employees(
	id integer auto_increment primary key,
    bid integer not null, foreign key(bid) references bids(id),
    posting integer not null, foreign key(posting) references postings(id),
    employee integer not null, foreign key(employee) references users(id)
);

create table terms(
	id integer auto_increment primary key,
    currently_working boolean default false,
    start_time DateTime,
    end_time DateTime,
    picture varchar(255),
    paid_for boolean default false,
    term_summery varchar(255),
    posting_employee integer not null, foreign key(posting_employee) references posting_employees(id)
);