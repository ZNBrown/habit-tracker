const HabitController = require('../../../controller/HabitController');
const User = require('../../../model/UserModel');
const Habit = require('../../../model/HabitModel');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }));
const mockRes = { status: mockStatus };

describe('habits controller', () => {
    beforeEach(() => jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('index', () => {
        test('it responds all habits and a status code of 200 ', async () => {
            //const response = new Response({ headers: newHeader })
            jest.spyOn(Habit, 'getHabitByUserId')
                .mockResolvedValue(['habit1', 'habit2', 'habit3']);
            await HabitController.indextest(null, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(['habit1', 'habit2', 'habit3']);
        })
    });

    // show
    describe('show', () => {
        test('it returns a habit and a 200 status code', async () => {
            let habitData = {
                habit_name: "Gym", frequency: "Daily", frequency_track: 3,
                frequency_target: 5, deadline: 10000, time_created: 100, complete: "false", user_id: 1
            };

            jest.spyOn(Habit, 'findById')
                .mockResolvedValue(new Habit({ id: 1, ...habitData }));

            const mockReq = { params: { id: 1 } }
            await HabitController.show(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith({
                id: 1, ...habitData
            });
        })
    });

    //// test for create

    // describe('create', () => {
    //     test('it creates a new habit with a 200 status code', async () => {
    //         let habitData = {
    //             habit_name: "Gym", habit_info: "Going to Gym", frequency: "Daily", frequency_track: 1,
    //             frequency_target: 2, complete: false, user_id: 1
    //         };
    //         let testUser = {
    //             username: 'user5',
    //             password: 'password5',
    //             email: 'email5'
    //         }
    //         let userEmail = { email: 'email5' };
    //         jest.spyOn(Habit, 'create')
    //             .mockResolvedValue(new Habit(habitData));
    //         jest.spyOn(User, 'findByEmail')
    //             .mockResolvedValueOnce(new User(testUser));
    //         const mockReq = { body: habitData, userEmail }
    //         await HabitController.create(mockReq, mockRes);
    //         expect(mockStatus).toHaveBeenCalledWith(500);
    //         expect(mockJson).toHaveBeenCalledWith(new Habit(habitData));
    //     })
    // });


    // // test for updateComp
    // describe('updateComp', () => {
    //     test('it returns an update habit completed  with a 200 status code', async () => {
    //         let habitData = {
    //             habit_name: "Gym", habit_info: "Going to Gym", frequency: "Daily", frequency_track: 2,
    //             frequency_target: 2, complete: true, user_id: 1
    //         };
    //         jest.spyOn(Habit.prototype, 'updateComplete')
    //             .mockResolvedValue(new Habit(habitData));
    //         const mockReq = { id: 1 }
    //         await HabitController.updateComp(mockReq, mockRes);
    //         expect(mockStatus).toHaveBeenCalledWith(500);
    //     })
    // });

    // // test for updatefreq

    // describe('updatefreq', () => {
    //     test('it returns an update habit completed  with a 200 status code', async () => {
    //         let habitData = {
    //             habit_name: "Gym", habit_info: "Going to Gym", frequency: "Daily", frequency_track: 2,
    //             frequency_target: 2, complete: true, user_id: 1, id: 1
    //         };
    //         let userData = { username: 'testUser', password: 'testPassword', email: 'testEmail' };

    //         jest.spyOn(Habit.prototype, 'updateFrequencyTrack')
    //             .mockResolvedValue(new Habit(habitData));
    //         const mockReq = { body: { id: 1, ...habitData, ...userData } }
    //         await HabitController.updatefreq(mockReq, mockRes);
    //         expect(mockStatus).toHaveBeenCalledWith(500);
    //     })
    // });

    // // test for reduceFreq

    // describe('updateComp', () => {
    //     test('it returns an update habit completed  with a 200 status code', async () => {
    //         let habitData = {
    //             habit_name: "Gym", habit_info: "Going to Gym", frequency: "Daily", frequency_track: 2,
    //             frequency_target: 2, complete: true, user_id: 1
    //         };
    //         jest.spyOn(Habit.prototype, 'updateComplete')
    //             .mockResolvedValue(new Habit(habitData));
    //         const mockReq = { id: 1 }
    //         await HabitController.updateComp(mockReq, mockRes);
    //         expect(mockStatus).toHaveBeenCalledWith(500);
    //     })
    // });


    // // describe('destroy', () => {
    // test('it returns a 201 status code on successful deletion', async () => {

    //     // let testHabit = {
    //     //     habit_name: "Gym", habit_info: "Going to Gym", frequency: "Daily", frequency_track: 3,
    //     //     frequency_target: 3, complete: false, user_id: 1
    //     // };

    //     jest.spyOn(Habit.prototype, 'del')
    //         .mockResolvedValue('The habit has been deleted');
    //     const mockReq = { params: { id: 1 } }
    //     await HabitController.destroy(mockReq, mockRes);
    //     expect(mockStatus).toHaveBeenCalledWith(501);
    // })
});






