const Habit = require('../../../model/HabitModel');
const User = require('../../../model/UserModel');
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
        test('habit to be an instance of an Array on successful db query', async () => {
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
        test('it resolves with a Habit on successful db query', async () => {
            let habitData = {
                habit_name: "Gym", habit_info: "Going to Gym", frequency: "Daily", frequency_track: 1,
                frequency_target: 2, complete: false, user_id: 1
            }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [habitData] });
            const result = await Habit.findById(1);
            expect(result).toBeInstanceOf(Habit)

        })
    });
    // test to create a new habit

    describe('create', () => {
        test('it contains a property of ID on successful db query', async () => {
            let habitData = {
                habit_name: "Gym", habit_info: "Going to Gym", frequency: "Daily", frequency_track: 1,
                frequency_target: 2, complete: false, user_id: 1
            };
            let userEmail = { email: 'email5' };
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [{ ...habitData, id: 1 }] });
            jest.spyOn(User, 'findByEmail')
                .mockResolvedValueOnce(new User({ id: 1, email: 'email5' }));
            const result = await Habit.create(habitData, userEmail);
            expect(result).toHaveProperty('id')
        })
    });

    // describe('create', () => {
    //     test('it resolves with book on successful db query', async () => {
    //         let bookData = { title: 'Test Book', yearOfPublication: 2020, abstract: 'test', authorName: 'Test Author' }
    //         jest.spyOn(db, 'query')
    //             .mockResolvedValueOnce({ rows: [{ ...bookData, id: 1 }] });
    //         jest.spyOn(Author, 'findOrCreateByName')
    //             .mockResolvedValueOnce(new Author({ id: 1, name: 'Test Author' }));
    //         const result = await Book.create(bookData);
    //         expect(result).toHaveProperty('id')
    //     })
    // });


    // //test to updateFrequencyTrack

    // describe('updateFrequencyTrack', () => {
    //     test('it resolves with updated habit on successful db query', async () => {
    //         let testHabit = new Habit({
    //             name: "Drink water", desc: "Drink 8 cups of water a day", frequency: "Daily", streak_track: 1,
    //             streak_end: "Streak End", streak_complete: "Streak Complete", userId: 1
    //         })
    //         jest.spyOn(db, 'query')
    //             .mockResolvedValueOnce({ rows: [{ streak_track: 2, id: 1 }] });
    //         const result = await testHabit.update();
    //         expect(result).toHaveProperty('id')
    //     })
    // });

    // // test to updateReduceFrequency

    // describe('update', () => {
    //     test('it resolves with updated habit on successful db query', async () => {
    //         let testHabit = new Habit({
    //             name: "Drink water", desc: "Drink 8 cups of water a day", frequency: "Daily", streak_track: 1,
    //             streak_end: "Streak End", streak_complete: "Streak Complete", userId: 1
    //         })
    //         jest.spyOn(db, 'query')
    //             .mockResolvedValueOnce({ rows: [{ streak_track: 2, id: 1 }] });
    //         const result = await testHabit.update();
    //         expect(result).toHaveProperty('id')
    //     })
    // });
    // test to updateComplete

    // test to delete






});