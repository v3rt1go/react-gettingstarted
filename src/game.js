'use strict';

const React = require('react');

const StarsFrame = React.createClass({
  render() {
    return (
      <div id="stars-frame">
        <div className="well">
          <span className="glyphicon glyphicon-star"></span>
          <span className="glyphicon glyphicon-star"></span>
          <span className="glyphicon glyphicon-star"></span>
          <span className="glyphicon glyphicon-star"></span>
        </div>
      </div>
    );
  }
});

const ButtonFrame = React.createClass({
  render() {
    return (
      <div>
        ...
      </div>
    );
  }
});

const AnswerFrame = React.createClass({
  render() {
    return (
      <div>
        ...
      </div>
    );
  }
});

const Game = React.createClass({
  render() {
    return (
      <div id="game">
        <h2>Play Nine</h2>

        <StarsFrame />
        <ButtonFrame />
        <AnswerFrame />
      </div>
    );
  }
});

module.exports = Game;
