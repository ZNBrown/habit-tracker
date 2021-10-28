const { response } = require("express");
const request = require("supertest");


describe('habits endpoints', () => {
    let api;
    let tokens;
    beforeEach(async () => {
        await resetTestDB()
    });

    beforeAll((done) =>  {
        request(app)
            .post('/main/login')
            .send({
                email : "testemail1",
                password : "testpassword1",
            })
            .end((err, response) => {
                console.log(`this is the reponse we are getiing in testing ${(JSON.parse(response.text).token)}`)
                tokens = JSON.parse(response.text).token;
                done();
            })
    })


    beforeAll(async () => {
        api = app.listen(5000, () => console.log('Test server running on port 5000'))
    });

    afterAll(async () => {
        console.log('Gracefully stopping test server')
        await api.close()
    })

    it('should create a new habit', async () => {
        const res = await request(api)
            .post('/main/register')
            .send({
                username: 'testUser',
                email: 'testEmail',
                password: 'testPassword'
            })
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("msg");
    });

    it('should display all users', async () => {
        const res = await request(api)
            .get('/main/allUsers').set('authorization', `${tokens}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(3);
    });


    it('should return a list of all habits for a certain user in database', async () => {
        console.log(`the token in the tests: ${tokens}`)
        const res = await request(api).get('/main/habit/allhabits').set('authorization', `${tokens}`)
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(2);
    });
    it('should create a new habit', async () => {
        const res = await request(api)
            .post('/main/habits')
            .send({
                habit_name : "Gym",
                frequency : "Daily",
                frequency_target : 5,
            }).set('authorization', `${tokens}`)
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("id");
        const authRes = await request(api).get('/main/habit/1').set('authorization', `${tokens}`);
        expect(authRes.statusCode).toEqual(200);
    });
    
        it('should create a new habit but on index 2', async () => {
            const res = await request(api)
                .post('/main/habits')
                .send({
                    habit_name : "drink water",
                    frequency : "Daily",
                    frequency_target : 5,
                }).set('authorization', `${tokens}`)
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty("id");
            const authRes = await request(api).get('/main/habit/2').set('authorization', `${tokens}`);
            expect(authRes.statusCode).toEqual(200);
        });



        it('should delete a book', async () => {
            const res = await request(api)
                .delete('/main/habit/1').set('authorization', `${tokens}`)
            expect(res.statusCode).toEqual(201);
    
            const bookRes = await request(api).get('/main/habit/1').set('authorization', `${tokens}`);
            expect(bookRes.statusCode).toEqual(500);
            expect(bookRes.body).toHaveProperty('err');
        }); 
})
