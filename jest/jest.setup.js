const { JSDOM } = require('jsdom');

global.DOMParser = new JSDOM().window.DOMParser;