var ReactDOM = require('react-dom');
var React = require('react');
var Feed = require('./components/feed.jsx');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;


var App = React.createClass({
  render: function() {
    return (
      <div>
        HELLO I AM APP
        {this.props.children}
      </div>
    );
  }
});

var router = (
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Feed} />
    </Route>
  </Router>
);




document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<App />, document.getElementById('root'));
});
