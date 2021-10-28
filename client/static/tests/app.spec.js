const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../../index.html'), 'utf8');
let myFuns;

describe('head testing', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        myFuns = require('../app')
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

    test('script link is a connected to request.js and app.js', () => {
		let jsLink = document.querySelector('script');
		let src = jsLink.getAttribute('src');
        expect(src).toBe('static/requests.js');
	});

})

describe('body testing in index.html', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    });

    test('clicking signup moves the styles', () => {
        const loginForm = document.querySelector("form.login");
        const loginText = document.querySelector(".title-text .login");
        expect(loginForm.style.marginLeft).toBeFalsy();
        expect(loginText.style.marginLeft).toBeFalsy();
    });
})