TRUNCATE users, habits RESTART IDENTITY;

INSERT INTO users  (username, password, email)
VALUES
    ('test user1','test password1','test email1'),
    ('test user2','test password1','test email1'),
    ('test user3','test password1','test email1');

INSERT INTO Habits (habit_name, frequency, frequency_track, frequency_target, deadline, time_created, complete, user_id)
VALUES
    ('Drinking','Daily', 3, 4, 24242432434, 2342424242, false, 1),
    ('test Drinking','Daily', 4, 6, 24242432434, 2342424242, false, 2),
    ('test gym','Daily', 5, 6, 24242432434, 2342424242, false, 3);
