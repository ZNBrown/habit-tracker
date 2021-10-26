const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../profile.html'), 'utf8');
let myFuns;
global.fetch = require('jest-fetch-mock');

describe('body rendering test', () => {
    beforeAll(() => {
        document.documentElement.innerHTML = html.toString();
        myFuns = require('./')
    })
})