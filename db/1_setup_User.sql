DROP TABLE IF EXISTS User;

CREATE TABLE User (
    id SERIAL PRIMARY KEY;
    username varchar(100) NOT NULL,
    password varchar(255) NOT NULL,
    email varchar(255) NOT NULL
);