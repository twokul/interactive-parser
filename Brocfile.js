/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

app.import('vendor/esprima/esprima.js');

app.import('vendor/codemirror/lib/codemirror.js');
app.import('vendor/codemirror/mode/javascript/javascript.js');
app.import('vendor/codemirror/lib/codemirror.css');

module.exports = app.toTree();
