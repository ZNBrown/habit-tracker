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

    describe('create', () => {
        test('it creates a new habit with a 200 status code', async () => {
            let habitData = {
                habit_name: "Gym", frequency: "Daily", frequency_track: 3,
                frequency_target: 6, deadline: 10000, time_created: 100, complete: "fail", user_id: 1
            };
            jest.spyOn(Habit, 'create')
                .mockResolvedValue(new Habit(habitData));
            const mockReq = { body: habitData }
            await HabitController.createTest(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(new Habit(habitData));
        })
    });



    // test for updateComp
  
    describe('updateComp', () => {
        test('it returns an update habit completed  with a 200 status code', async () => {
            let habitData = {
                habit_name: "Gym", frequency: "Daily", frequency_track: 3,
                frequency_target: 6, deadline: 10000, time_created: 100, complete: "fail", user_id: 1
            };
            jest.spyOn(Habit, 'findById')
                .mockResolvedValue(new Habit(habitData));

            const mockReq = {  id: 1 }
            await HabitController.updateComp(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(404);
        })
    });
  
    // test for updatefreq

    describe('updatefreq', () => {
        test('it returns an update habit completed  with a 200 status code', async () => {
            let habitData = {
                habit_name: "Gym", frequency: "Daily", frequency_track: 3,
                frequency_target: 6, deadline: 10000, time_created: 100, complete: "fail", user_id: 1
            };

            jest.spyOn(Habit, 'findById')
                .mockResolvedValue(new Habit(habitData));
            let mockReq = {id:1}

            await HabitController.updatefreq(mockReq, mockRes)
            expect(mockStatus).toHaveBeenCalledWith(404);
        })
    });

    // // test for reduceFreq

    describe('reduceFreq', () => {
        test('it returns an update habit completed with a 200 status code', async () => {
            let habitData = {
                habit_name: "Gym", frequency: "Daily", frequency_track: 3,
                frequency_target: 6, deadline: 10000, time_created: 100, complete: "fail", user_id: 1
            };
            jest.spyOn(Habit, 'findById')
                .mockResolvedValue(new Habit(habitData));
            const mockReq = { id: 1  }

            await HabitController.reduceFreq(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(404);
        })
    });

    

    //test for delete
    describe('destroy', () => {
        test('it returns a 201 status code on successful deletion', async () => {
            jest.spyOn(Habit.prototype, 'del')
                .mockResolvedValue('The habit has been deleted');
            const mockReq = { params: { id: 1 } }
            await HabitController.destroy(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(201);
        })
    });


});






