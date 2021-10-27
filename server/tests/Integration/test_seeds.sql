TRUNCATE users, habits RESTART IDENTITY;

INSERT INTO users  (username, password, email)
VALUES
    ('test user1','test password1','test email1'),
    ('test user2','test password1','test email1'),
    ('test user3','test password1','test email1');

INSERT INTO Habits (habit_name,  frequency, frequency_track, frequency_target, complete, user_id)
VALUES
    ('testing', 'daily', 4, 7, false, 1),
    ('test Drinking', 'hours', 4, 5, false, 2),
    ('test gym','hours', 2, 3, false, 3);



