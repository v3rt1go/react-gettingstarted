'use strict';

const React = require('react');

var Button = React.createClass({
  render() {
    return (
      <button>Go</button>
    );
  }
});

React.render(<Button />, document.getElementById("root"));

