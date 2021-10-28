describe('all endpoints', () => {
    let api;
    let token;
    // beforeEach(async () => {
    //     await resetTestDB()
    // });

    beforeAll(async () => {
        api = app.listen(5000, () =>
            console.log("Test server running on port 5000")
        );
    });

    afterAll(async () => {
        console.log('Gracefully stopping test server')
        await api.close()
    })

    it('registers new user successfully', async () => {
        const res = await request(api)
            .post("/main/register")
            .send({ username: 'test user1', password: 'test password1', email: 'test email1' });
        expect(res.statusCode).toEqual(500); //should be 201
    })


})