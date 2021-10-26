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

    // test to findById

    // test to create a new habit

    //test to updateFrequencyTrack

    // test to updateReduceFrequency

    // test to updateComplete

    // test to delete





});