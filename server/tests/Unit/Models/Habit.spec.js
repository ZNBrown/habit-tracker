const Habit = require('../../../model/HabitModel');
const pg = require('pg');
jest.mock('pg');
const db = require('../../../dbConfig/init');


describe('Habit', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    //  test for all 

    describe('all', () => {
        test('it resolves with all habits on successful db query', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [{}, {}, {}] });
            const all = await Habit.all;
            expect(all).toHaveLength(3)
        })
    });

    //  test to getHabitByUserId

    describe('getHabitByUserId', () => {
        test('habit  on successful db query', async () => {
            let habitData = {
                habit_name: "Gym", habit_info: "Going to Gym", frequency: "Daily", frequency_track: 1,
                frequency_target: 2, complete: false, user_id: 1
            }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [habitData] });
            const result = await Habit.getHabitByUserId(1);
            expect(result).toBeInstanceOf(Array)
        })

    });

    // test to findById

    describe('findById', () => {
        test('it resolves with habits of user on successful db query', async () => {
            let habitData = {
                habit_name: "Gym", habit_info: "Going to Gym", frequency: "Daily", frequency_track: 1,
                frequency_target: 2, complete: false, user_id: 1}
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [habitData] });
            const result = await Habit.findById(1);
            expect(result).toBeInstanceOf(Habit)

        })
    });
    // test to create a new habit

    //test to updateFrequencyTrack

    // test to updateReduceFrequency

    // test to updateComplete

    // test to delete

    //     INSERT INTO Habits (habit_name, habit_info, frequency, frequency_track, frequency_target, complete, user_id)
    // VALUES
    //     ('testing', 'testing water', 'daily', 4, 7, false, 1),
    //     ('test Drinking','test Drinking water','hours', 4, 5, false, 2),
    //     ('test gym','test Drinking gym','hours', 2, 3, false, 3);





});