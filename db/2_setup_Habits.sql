DROP TABLE IF EXISTS Habits;

CREATE TABLE Habits (
    id SERIAL PRIMARY KEY,
    habit_name varchar(100) NOT NULL,
    frequency varchar(100) NOT NULL,
    frequency_track int NOT NULL,
    frequency_target int NOT NULL,
    deadline bigint NOT NULL,
    time_created bigint NOT NULL,
    complete varchar(10) NOT NULL,
    user_id INT
);

