'use strict';

const React = require('react');
const $ = require('jquery');

const Card = React.createClass({
  // Even though we don't set anything to the return object, we need to use the
  // getInitialState function to return an empty object so we can later assign
  // properties to the object with setState
  getInitialState() {
    return {};
  },
  componentDidMount() {
    const component = this;
    $.get("https://api.github.com/users/" + this.props.login, (data) => {
      // We use the returned data json object to set the state of the component
      // so basically we are giving the component the same state properties
      // as the data object has
      component.setState(data);
    });
  },
  render() {
    return (
      <div>
        <img src={this.state.avatar_url} width="80" />
        <h3>{this.state.name}</h3>
        <hr />
      </div>
    );
  }
});

const Form = React.createClass({
  addLogin(e) {
    e.preventDefault();
    // To access the value of the input field in this function we need to use
    // the ref attribute on the field and then define the var here like so
    const loginInput = React.findDOMNode(this.refs.login);
    this.props.addCard(loginInput.value);
    // After adding the value in the logins array we clear the value for the
    // next submit
    loginInput.value = "";
  },
  render() {
    return (
      <form onSubmit={this.addLogin}>
        <input placeholder="gihub login" ref="login"/>
        <button>Add</button>
      </form>
    );
  }
});

const Main = React.createClass({
  addCard(login) {
    this.setState({
      logins: this.state.logins.concat(login)
    });
  },
  getInitialState() {
    return {
      logins: []
    };
  },
  render() {
    const cards = this.state.logins.map((login) => {
      return (<Card login={login} />);
    });
    return (
      <div>
        <Form addCard={this.addCard} />
        {cards}
      </div>
    );
  }
});

module.exports = Main;
