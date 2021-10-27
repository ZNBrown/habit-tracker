const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../profile.html'), 'utf8');
let myFuns;
global.fetch = require('jest-fetch-mock');

describe('upper body test', () => {
    beforeAll(() => {
        document.documentElement.innerHTML = html.toString();
        myFuns = require('../profile');
    });

    test('header title has "Welcome"', () => {
        const welcomeMessage = myFuns.welcomeUser(e);
        expect(welcomeMessage).toContain('Welcome');
    })

    test('add new habit displays habit-modal', () => {
        const habitModal = myFuns.showAddHabitForm(e);
        expect(habitModal).classList.not.toContain('hidden');
    });

    test('close button in habit modal form closes', () => {
        const closeHabit = myFuns.closeHabitForm();
        expect(closeHabit).classList.toContain('hidden');
    });

    // test('log out redirects to index, () => {
    //     const logOut = myFuns.logOutBtn();
    //     expect(logOut).
    // }) 
});

describe('body rendering', () => {
    beforeAll(()=> {
        document.documentElement.innerHTML = ``
    })
})