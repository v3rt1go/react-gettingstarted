'use strict';

const React = require('react');

const StarsFrame = React.createClass({
  render() {
    // If we define the number of stars here, it will refresh each time we
    // interact with our Game component - like picking a number from the
    // NumbersFrame. Not sure why ... maybe because the Game component redraws
    // it's child components .. To fix this we define the random numberOfStars
    // inside the state of the parent Game component and pass it to the
    // StarsFrame
    // const numberOfStars = Math.floor(Math.random() * 9) + 1;
    let stars = [];
    for (let i = 0; i < this.props.numberOfStars; i++) {
      stars.push(
        <span className="glyphicon glyphicon-star"></span>
      );
    };

    // When react sees an array inside a jsx block with {} it will just join it
    // and render it directly
    return (
      <div id="stars-frame">
        <div className="well">
          {stars}
        </div>
      </div>
    );
  }
});

const ButtonFrame = React.createClass({
  render() {
    return (
      <div id="button-frame">
        <button className="btn btn-primary btn-lg">=</button>
      </div>
    );
  }
});

const AnswerFrame = React.createClass({
  render() {
    return (
      <div id="answer-frame">
        <div className="well">
          {this.props.selectedNumbers}
        </div>
      </div>
    );
  }
});

const NumbersFrame = React.createClass({
  render() {
    const clickNumber = this.props.clickNumber;
    let selectedNumbers = this.props.selectedNumbers;

    let numbers = [],
        className;

    for (let i = 1; i <= 9; i++) {
      className = "number selected-" + (selectedNumbers.indexOf(i) >= 0);
      numbers.push(
        // TODO: test this scenario
        // We cannot call directly clickNumber(i) because this will execute at
        // runtime and i will not have the correct value; We use bind to create
        // a closure - a copy of this function that will hold the current value
        // of i instead of it's last one and since we don't need to explicitly
        // set the this keyword we set it to null
        <div className={className} onClick={clickNumber.bind(null, i)}>
          {i}
        </div>
      );
    };

    return (
      <div id="numbers-frame">
        <div className="well">
          {numbers}
        </div>
      </div>
    );
  }
});


const Game = React.createClass({
  // Get initial state is also in charge of initializing a state for the
  // component. Meaning that if we don't declare getInitialState() inside a
  // component that component will have no state
  getInitialState() {
    return {
      numberOfStars: Math.floor(Math.random() * 9) + 1,
      selectedNumbers: []
    };
  },
  clickNumber(clickedNumber) {
    if (this.state.selectedNumbers.indexOf(clickedNumber) < 0) {
      this.setState(
        {
          selectedNumbers: this.state.selectedNumbers.concat(clickedNumber)
        }
      );
    }
  },
  render() {
    return (
      <div id="game">
        <h2>Play Nine</h2>
        <hr />
        <div className="clearfix">
          <StarsFrame numberOfStars={this.state.numberOfStars}/>
          <ButtonFrame />
          <AnswerFrame selectedNumbers={this.state.selectedNumbers}/>
        </div>
        <NumbersFrame selectedNumbers={this.state.selectedNumbers}
                      clickNumber={this.clickNumber} />
      </div>
    );
  }
});

module.exports = Game;
