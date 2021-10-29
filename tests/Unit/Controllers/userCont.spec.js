const UserController = require('../../../controller/UserController');
const User = require('../../../model/UserModel');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }));
const mockRes = { status: mockStatus };

describe('users controller', () => {
    beforeEach(() => jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('index', () => {
        test('it responds all users and a status code of 200 ', async () => {
            jest.spyOn(User, 'all', 'get')
                .mockResolvedValue(['user1', 'user2', 'user3']);
            await UserController.index(null, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(['user1', 'user2', 'user3']);
        })
    });

    describe('show', () => {
        test('it returns a user by email and a status code of 200 ', async () => {
            let testUser = {
                username: 'user5',
                password: 'password5',
                email: 'email5'
            }
            jest.spyOn(User, 'findByEmail')
                .mockResolvedValue(new User(testUser));
            const mockReq = { params: { id: 1 } }
            await UserController.show(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(new User(testUser));
        })
    });
})