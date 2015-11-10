'use strict';

const React = require('react');
const WorkingWithData = require('./workingWithData.js');

const Button = React.createClass({
  localIncrement() {
    // We can access the myIncrementCounter from the parent Main component
    // from the props object with the name it was passed to this component
    this.props.localIncrementCounter(this.props.increment);
  },
  // In react we use render to return what will be rendered on screen from the
  // react component
  render() {
    return (
      <button onClick={this.localIncrement}>+{this.props.increment}</button>
    );
  }
});

// Reusable components
const Result = React.createClass({
  render() {
    return (
      <div>{this.props.localCounter}</div>
    );
  }
});

// To share state properties between components we need to define them on a
// parent component that contains the compoenent we want to share state with
const Main = React.createClass({
  // We use getInitialState to set a default/starting value for state properties
  // that we want to use inside the react component
  getInitialState() {
    return {
      counter: 0
    };
  },
  myIncrementCounter(increment) {
    // We use setState to set the value of a state property from the component
    this.setState({ counter: this.state.counter + increment });
  },
  render() {
    return (
      <div>
        <Button localIncrementCounter={this.myIncrementCounter} increment={1} />
        <Button localIncrementCounter={this.myIncrementCounter} increment={5} />
        <Button localIncrementCounter={this.myIncrementCounter} increment={10} />
        <Button localIncrementCounter={this.myIncrementCounter} increment={100} />
        <Result localCounter={this.state.counter} />
        <WorkingWithData />
      </div>
    );
  }
});

module.exports = Main;
