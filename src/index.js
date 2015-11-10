'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const WorkingWithComponents = require('./workingWithComponets.js');
const Game = require('./game.js');

ReactDOM.render(<Game />, document.getElementById('container'));
ReactDOM.render(<WorkingWithComponents />, document.getElementById("root"));
