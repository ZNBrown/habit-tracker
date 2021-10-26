const User = require('../../../model/UserModel');
const pg = require('pg');
jest.mock('pg');
const db = require('../../../dbConfig/init');

describe('User', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())
    //  test for all 
    describe('all', () => {
        test('it resolves with users on successful db query', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [{}, {}, {}] });
            const all = await User.all;
            expect(all).toHaveLength(3)
        })
    });
    //  test for create 

    describe('create', () => {
        test('it resolves with user on successful db query', async () => {
            let userData = { username: 'testUser', password: 'testPassword', email: 'testEmail' };
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [userData] });
            const result = await User.create(userData);
            expect(result).toHaveProperty('id')
        })
    });

   

});