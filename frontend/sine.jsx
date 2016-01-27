var ReactDOM = require('react-dom');
var React = require('react');
var Feed = require('./components/feed.jsx');


var App = React.createClass({
  render: function() {
    return (
      <div>
        <Feed />
      </div>
    );
  }
});





document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<App />, document.getElementById('root'));
});
