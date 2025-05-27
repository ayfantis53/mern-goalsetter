// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// provide an empty implementation for window.alert.
let jsdomAlert;

// jsdom doesn't implement TextEncoder yet, so we need this until JS fixes their code. 
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;