TRUNCATE users, Habits RESTART IDENTITY;

INSERT INTO users (username, email, password)
VALUES
    ('testuser1','testemail1','testpassword1'),
    ('testuser2','testemail2','testpassword2'),
    ('testuser3','testemail3','testpassword3');

INSERT INTO Habits (habit_name, frequency, frequency_track, frequency_target, deadline, time_created, complete, user_id)
VALUES
    ('Drinking','Daily', 3, 4, 24242432434, 2342424242, false, 1),
    ('test Drinking','Daily', 4, 6, 24242432434, 2342424242, false, 1),
    ('test gym','Daily', 5, 6, 24242432434, 2342424242, false, 3);
