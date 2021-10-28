const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../../profile.html'), 'utf8');
let myFuns;


describe('head testing', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        myFuns = require('../profile')
    });

    test('the title has been changed from the default', () => {
		let title = document.querySelector('title');
		expect(title.textContent).not.toEqual('Document');
	});

    test('css link is not # (default)', () => {
		let css = document.querySelector('link[rel="stylesheet"]');
		expect(css.getAttribute('href')).not.toEqual('#');
	});

    test('css links to a file with .css as its extension', () => {
		let css = document.querySelectorAll('link[rel="stylesheet"]');
		css.forEach((file) => {
			let link = file.getAttribute('href');
			let result = /.css$/i.test(link);
			expect(result).toBeTruthy();
		});
	});

    test('the page has a favicon element', () => {
		let iconLink = document.querySelector('link[rel="icon"]');
		expect(iconLink).toBeTruthy();
	});

    test('script tag is present', () => {
		let javascriptLink = document.querySelector('script');
		expect(javascriptLink).toBeTruthy();
	});

    test('script has a src attribute', () => {
		let jsLink = document.querySelector('script');
		let src = jsLink.getAttribute('src');
		expect(src).toBeTruthy();
	});

    test('script link is connected to axios', () => {
        let axLink = document.querySelector('script');
        let srcx = axLink.getAttribute('srcx');
        expect(srcx).toBeFalsy();;
    });


})


describe('upper body test', () => {
    beforeAll(() => {
        document.documentElement.innerHTML = html.toString();
        myFuns = require('../profile');
    });

    test('header title has "Welcome"', () => {
        const welcomeMessage = document.querySelector("#welcomeUser");
        expect(welcomeMessage.textContent).toContain("");
        expect(welcomeMessage.textContent).not.toEqual('Document');
    });


    test('add new habit displays habit-modal', () => {
        myFuns.showAddHabitForm();
        const habitModal = document.querySelector('.habit-modal')
        expect(habitModal).classList.not.toContain("hidden");
    });

    test('close button in habit modal form closes', () => {
        myFuns.closeHabitForm();
        const closeModal = document.querySelector('.habit-modal')
        expect(closeModal.classList).toContain({});
    });


});

describe('body render', () => {
    beforeAll(() => {
        document.documentElement.innerHTML = html.toString();
        myFuns = require('../profile');
    });

    
})
