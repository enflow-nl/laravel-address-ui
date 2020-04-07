'use strict';
var insertCss = require('insert-css');
var fs = require('fs');

document.documentElement.lang = 'en';

var meta = document.createElement('meta');
meta.name = 'viewport';
meta.content = 'initial-scale=1,maximum-scale=1,user-scalable=no';
document.getElementsByTagName('head')[0].appendChild(meta);

var style = document.createElement('style');
style.innerHTML = '*, *:before, *:after {' +
    '  box-sizing: border-box;\n' +
    '}' +
    'body {' +
    '  font-size: 18px;\n' +
    '  line-height: 24px;\n' +
    '  font-family: "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;\n' +
    '}' +
    '.form-control {\n' +
    '  font: inherit;\n' +
    '  width: 100%;\n' +
    '  border: 0;\n' +
    '  background-color: transparent;\n' +
    '  margin: 0;\n' +
    '  color: #404040; /* fallback */\n' +
    '  color: rgba(0, 0, 0, 0.75);\n' +
    '  padding: 8px;\n' +
    '  text-overflow: ellipsis;\n' +
    '  white-space: nowrap;\n' +
    '  overflow: hidden;\n' +
    '  border: 1px solid #eee\n' +
    '}\n' +
    '\n' +
    '.form-control::-ms-clear {\n' +
    '  display: none; /* hide input clear button in IE */\n' +
    '}\n' +
    '\n' +
    '.form-control:focus {\n' +
    '  color: #404040; /* fallback */\n' +
    '  color: rgba(0, 0, 0, 0.75);\n' +
    '  outline: 0;\n' +
    '  box-shadow: none;\n' +
    '}' +
    '' +
    '\n' +
    '/* Media queries*/\n' +
    '@media screen and (min-width: 640px) {\n' +
    '  .form-control {\n' +
    '    padding: 6px 12px;\n' +
    '  }\n' +
    '\n' +
    '}\n';
document.getElementsByTagName('head')[0].appendChild(style);

insertCss(fs.readFileSync('./lib/address.css', 'utf8'));

var Address = require('../');

var wrapper = document.createElement('div');
wrapper.setAttribute('class', '');
wrapper.setAttribute('role', 'address');
document.body.appendChild(wrapper);

var input = document.createElement('input');
input.name = 'address_label';
input.type = 'search';
input.setAttribute('class', 'form-control');
input.setAttribute('role', 'address-label');
wrapper.appendChild(input);

var value = document.createElement('input');
value.name = 'address';
value.type = 'text';
value.style = 'opacity: .5;';
value.setAttribute('role', 'address-value');
wrapper.appendChild(value);

var address = new Address('[role=address]', {
  endpoint: 'https://banzaboo.client.test/address/suggest'
});

address.on('results', function(e) {
  console.log('results: ', e.items);
});

address.on('result', function(e) {
  console.log('result: ', e.result);
});

address.on('clear', function(e) {
  console.log(e)
  console.log('clear');
});

address.on('loading', function(e) {
  console.log('loading:', e.query);
});

address.on('error', function(e) {
  console.log('Error is', e.error);
});
