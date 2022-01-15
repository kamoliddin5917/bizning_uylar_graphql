CREATE DATABASE ucharteam;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE verify_users(
    id SERIAL NOT NULL PRIMARY KEY,
    firstname varchar(50) not null,
    lastname varchar(50) not null,
    email varchar(70) unique not null,
    password text not null,
    cod bigint not null,
    try_count int default 0,
    is_active boolean default false
);

CREATE TABLE admins(
    admin_id uuid NOT NULL default uuid_generate_v4() PRIMARY KEY,
    admin_username varchar(50) unique not null,
    admin_login text not null,
    admin_password text not null,
    admin_date timestamp with time zone not null default current_timestamp,
    admin_status boolean default true 
);

CREATE TABLE users(
    user_id uuid NOT NULL default uuid_generate_v4() PRIMARY KEY,
    user_firstname varchar(50) not null,
    user_lastname varchar(50) not null,
    user_email varchar(70) unique not null,
    user_password text not null,
    user_image text default null,
    user_date timestamp with time zone not null default current_timestamp,
    user_status boolean default true 
);


CREATE TABLE companies(
    company_id uuid NOT NULL default uuid_generate_v4() PRIMARY KEY,
    company_name varchar(200) not null,
    company_media text [] not null,
    company_inform text not null,
    company_date timestamp with time zone not null default current_timestamp,
    company_status boolean default true,
    company_owner uuid not null,
    CONSTRAINT fk_company_owner
        FOREIGN KEY(company_owner)
            REFERENCES users(user_id)
            ON DELETE CASCADE
);

CREATE TABLE complexes(
    complex_id uuid NOT NULL default uuid_generate_v4() PRIMARY KEY,
    complex_name varchar(200) not null,
    complex_media text [] not null,
    complex_inform text not null,
    complex_date timestamp with time zone not null default current_timestamp,
    complex_status boolean default true,
    complex_company uuid not null,
    CONSTRAINT fk_complex_company
        FOREIGN KEY(complex_company)
            REFERENCES companies(company_id)
            ON DELETE CASCADE
);

CREATE TABLE houses(
    house_id uuid NOT NULL default uuid_generate_v4() PRIMARY KEY,
    house_floor int not null,
    house_room int not null,
    house_kvm int not null,
    house_kvm_sum int not null,
    house_media text [] not null,
    house_inform text not null,
    house_date timestamp with time zone not null default current_timestamp,
    house_status boolean default true,
    house_complex uuid not null,
    CONSTRAINT fk_house_complex
        FOREIGN KEY(house_complex)
            REFERENCES complexes(complex_id)
            ON DELETE CASCADE
);

CREATE TABLE banks(
    bank_id uuid NOT NULL default uuid_generate_v4() PRIMARY KEY,
    bank_name varchar(77) not null,
    bank_kridit_sum bigint not null,
    bank_kridit_time int not null,
    bank_email varchar(70) unique not null,
    bank_media text [] not null,
    bank_inform text not null,
    bank_date timestamp with time zone not null default current_timestamp,
    bank_status boolean default true
);

