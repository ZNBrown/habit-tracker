TRUNCATE users, habits RESTART IDENTITY;

INSERT INTO users  (username, password, email)
VALUES
    ('test user1','test password1','test email1'),
    ('test user2','test password1','test email1'),
    ('test user3','test password1','test email1');

INSERT INTO Habits (habit_name, frequency, frequency_track, frequency_target, deadline, time_created, complete, user_id)
VALUES
    ('Drinking','daily', 3, 4, 24242432434, 2342424242, false, 1),
    ('test Drinking','hours', 4, 6, 24242432434, 2342424242, false, 2),
    ('test gym','daily', 5, 6, 24242432434, 2342424242, false, 3);
