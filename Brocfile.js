/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

app.import('bower_components/esprima/esprima.js');
app.import('bower_components/codemirror/lib/codemirror.js');
app.import('bower_components/codemirror/mode/javascript/javascript.js');
app.import('bower_components/codemirror/lib/codemirror.css');

module.exports = app.toTree();
