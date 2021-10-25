DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username varchar(100) NOT NULL,
    password varchar(255) NOT NULL,
    email varchar(255) NOT NULL
);