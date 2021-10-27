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

    // describe('index', () => {
    //     test('it responds all habits and a status code of 200 ', async () => {
    //         jest.spyOn(Habit, 'all', 'get')
    //             .mockResolvedValue(['habit1', 'habit2', 'habit3']);
    //         await HabitController.index(null, mockRes);
    //         expect(mockStatus).toHaveBeenCalledWith(200);
    //         expect(mockJson).toHaveBeenCalledWith(['habit1', 'habit2', 'habit3']);
    //     })
    // });

    // test for create

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
    //         expect(mockStatus).toHaveBeenCalledWith(200);
    //         expect(mockJson).toHaveBeenCalledWith(new Habit(habitData));
    //     })
    // });


    // test for updateComp
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
    //         expect(mockStatus).toHaveBeenCalledWith(200);
    //     })
    // });

    // test for updatefreq

    // test for reduceFreq

    // test for destroy






});








    // describe('show', () => {
    //     test('it returns a user by email and a status code of 200 ', async () => {
    //         let testUser = {
    //             username: 'user5',
    //             password: 'password5',
    //             email: 'email5'
    //         }
    //         jest.spyOn(User, 'findByEmail')
    //             .mockResolvedValue(new User(testUser));
    //         const mockReq = { params: { id: 1 } }
    //         await UserController.show(mockReq, mockRes);
    //         expect(mockStatus).toHaveBeenCalledWith(200);
    //         expect(mockJson).toHaveBeenCalledWith(new User(testUser));
    //     })
    // });
//})