'use strict';

const React = require('react');
const possibleCombinationSum = require('./possibleCombinationSum.js');

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
    }

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
    let button, disabled;
    const correct = this.props.correct,
          redrawCount = this.props.redrawCount;

    switch (correct) {
      case true:
        button = (
          <button className="btn btn-success btn-lg" onClick={this.props.acceptAnswer}>
            <span className="glyphicon glyphicon-ok"></span>
          </button>
        );
        break;
      case false:
        button = (
          <button className="btn btn-danger btn-lg">
            <span className="glyphicon glyphicon-remove"></span>
          </button>
        );
        break;
      default:
        disabled = (this.props.selectedNumbers.length === 0);
        button = (
          <button className="btn btn-primary btn-lg" disabled={disabled}
                  onClick={this.props.checkAnswer}>
            =
          </button>
        );
    }

    // React is smart enough to not include the disabled property if the
    // condition is false
    return (
      <div id="button-frame">
        {button}
        <br />
        <br />
        <button className="btn btn-warning btn-xs"
                onClick={this.props.redraw}
                disabled={redrawCount <= 0}>
          <span className="glyphicon glyphicon-refresh">
            <br />
            {redrawCount}
          </span>
        </button>
      </div>
    );
  }
});

const AnswerFrame = React.createClass({
  render() {
    const props = this.props;
    let selectedNumbers = props.selectedNumbers.map((number) => {
      return (
        <span onClick={props.unselectNumber.bind(null, number)}>
          {number}
        </span>
      );
    });
    return (
      <div id="answer-frame">
        <div className="well">
          {selectedNumbers}
        </div>
      </div>
    );
  }
});

const NumbersFrame = React.createClass({
  render() {
    const selectNumber = this.props.selectNumber,
          usedNumbers = this.props.usedNumbers,
          selectedNumbers = this.props.selectedNumbers;

    let numbers = [],
        className;

    for (let i = 1; i <= 9; i++) {
      className = "number selected-" + (selectedNumbers.indexOf(i) >= 0);
      className += " used-" + (usedNumbers.indexOf(i) > -1);
      numbers.push(
        // TODO: test this scenario
        // We cannot call directly selectNumber(i) because this will execute at
        // runtime and i will not have the correct value; We use bind to create
        // a closure - a copy of this function that will hold the current value
        // of i instead of it's last one and since we don't need to explicitly
        // set the this keyword we set it to null
        <div className={className} onClick={selectNumber.bind(null, i)}>
          {i}
        </div>
      );
    }

    return (
      <div id="numbers-frame">
        <div className="well">
          {numbers}
        </div>
      </div>
    );
  }
});

const DoneFrame = React.createClass({
  render() {
    return (
      <div className="well text-center">
        <h2>{this.props.doneStatus}</h2>
        <button className="btn btn-default" onClick={this.props.resetGame}>
          Play Again
        </button>
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
      selectedNumbers: [],
      usedNumbers: [],
      correct: null,
      redrawCount: 5,
      doneStatus: null
    };
  },
  resetGame() {
    // We're going to use react's this.replaceState method to replace all the
    // current state of the component to the object we pass it.
    this.replaceState(this.getInitialState());
  },
  selectNumber(clickedNumber) {
    if (this.state.selectedNumbers.indexOf(clickedNumber) < 0
        && this.state.usedNumbers.indexOf(clickedNumber) < 0) {
      // When a player selects a number we have to reset the button so he can
      // recheck his answer. For this we set correct: null each time a player
      // selects or unselects an answer
      this.setState(
        {
          selectedNumbers: this.state.selectedNumbers.concat(clickedNumber),
          correct: null
        }
      );
    }
  },
  unselectNumber(clickedNumber) {
    let selectedNumbers = this.state.selectedNumbers;
    const indexOfClicked = selectedNumbers.indexOf(clickedNumber);

    if (indexOfClicked > -1) {
      selectedNumbers.splice(indexOfClicked, 1);
      this.setState({
        selectedNumbers: selectedNumbers,
        correct: null
      });
    }
  },
  sumOfSelectedNumbers() {
    return this.state.selectedNumbers.reduce((p, n) => {
      return p + n;
    }, 0);
  },
  checkAnswer() {
    const correct = (this.state.numberOfStars === this.sumOfSelectedNumbers());
    this.setState({
      correct: correct
    });
  },
  acceptAnswer() {
    // After a player has checked a response of an answer - and it's a success
    // he has to accept the answer so the game can mark the used numbers as
    // permanently used and the starsFrame will draw a new number of random
    // stars
    const usedNumbers = this.state.usedNumbers.concat(this.state.selectedNumbers);

    // The setState method of react is async by nature. It takes an optional
    // second argument - beside the state object - that will be the callback to
    // be invoked when react finishes updating the state of the component
    this.setState({
      // reset the selected numbers frame
      selectedNumbers: [],
      // updated the usedNumbers array with the previously selected numbers
      usedNumbers: usedNumbers,
      // reset the button for a new check
      correct: null,
      // redraw a new number of random stars for the stars frame
      numberOfStars: Math.floor(Math.random() * 9) + 1
    }, () => {
      // In the callback of setState (when the new state values have been
      // updated) we re-check the doneStatus of the game
      this.updateDoneStatus();
    });
  },
  redraw() {
    if (this.state.redrawCount > 0) {
      this.setState({
        numberOfStars: Math.floor(Math.random() * 9) + 1,
        selectedNumbers: [],
        correct: null,
        redrawCount: this.state.redrawCount - 1
      }, () => {
        this.updateDoneStatus();
      });
    }
  },
  possibleSolutions() {
    const numberOfStars = this.state.numberOfStars,
          usedNumbers = this.state.usedNumbers;
    let possibleNumbers = [];

    // generate array of possible numbers
    for (let i = 1; i <= 9; i++) {
      // the number has not been used
      if (usedNumbers.indexOf(i) < 0) {
    console.log('in update status');
        possibleNumbers.push(i);
      }
    }

    // We're going to use a function from possibleCombinationSum that takes an
    // array of numbers and adds them up to try and match a given number passed
    // as the second argument. Returns true/false if possible
    return possibleCombinationSum(possibleNumbers, numberOfStars);
  },
  updateDoneStatus() {
    // updateDoneStatus has to be called each time an answer is accepted or a
    // redraw is called to check if the game is over or not
    if (this.state.usedNumbers.length === 9) {
      this.setState({
        doneStatus: 'Done. Nice Job!'
      });
      return;
    }

    if (this.state.redrawCount === 0 && !this.possibleSolutions()) {
      this.setState({
        doneStatus: 'Game Over!'
      });
    }
  },
  render() {
    const selectedNumbers = this.state.selectedNumbers,
          usedNumbers = this.state.usedNumbers,
          redrawCount = this.state.redrawCount,
          numberOfStars = this.state.numberOfStars,
          correct = this.state.correct,
          doneStatus = this.state.doneStatus;
    let bottomFrame;

    if (doneStatus) {
      bottomFrame = <DoneFrame doneStatus={doneStatus}
                               resetGame={this.resetGame} />;
    } else {
      bottomFrame = <NumbersFrame selectedNumbers={selectedNumbers}
                      usedNumbers = {usedNumbers}
                      selectNumber={this.selectNumber} />;
    }

    return (
      <div id="game">
        <h2>Play Nine</h2>
        <hr />
        <div className="clearfix">
          <StarsFrame numberOfStars={numberOfStars}/>

          <ButtonFrame selectedNumbers={selectedNumbers}
                       redrawCount={redrawCount}
                       redraw={this.redraw}
                       correct={correct}
                       checkAnswer={this.checkAnswer}
                       acceptAnswer={this.acceptAnswer}/>

          <AnswerFrame selectedNumbers={selectedNumbers}
                       unselectNumber={this.unselectNumber} />

        </div>
        {bottomFrame}

      </div>
    );
  }
});

module.exports = Game;
