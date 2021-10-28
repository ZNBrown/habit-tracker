const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../../profile.html'), 'utf8');
let myFuns;

describe('upper body test', () => {
    beforeAll(() => {
        document.documentElement.innerHTML = html.toString();
        myFuns = require('../profile');
    });

    test('header title has "Welcome"', () => {
        const welcomeMessage = document.querySelector("#welcomeUser");
        expect(welcomeMessage.textContent).toContain('Welcome,');
        expect(welcomeMessage.textContent).not.toEqual('Document');
    });


    test('add new habit displays habit-modal', () => {
        const habitModal = myFuns.showAddHabitForm();
        expect(habitModal.classList).not.toEqual("hidden");
    });

    test('close button in habit modal form closes', () => {
        const closeHabit = myFuns.closeHabitForm();
        expect(closeHabit.classList).toEqual('hidden');
    });

    
});
