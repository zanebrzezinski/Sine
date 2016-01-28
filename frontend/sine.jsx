var ReactDOM = require('react-dom');
var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var Feed = require('./components/feed.jsx');
var Loop = require('./components/loop.jsx');
var LoopShow = require('./components/loopShow.jsx');
var User = require('./components/user.jsx');


var App = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.children}
     </div>
    );
  }
});

var router = (
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Feed} />
      <Route path="loops/:loopId" component={LoopShow} />
      <Route path="users/:userId" component={User} />
    </Route>
  </Router>
);

window.initializeSine = function(){
  document.addEventListener("DOMContentLoaded", function () {
    ReactDOM.render(router, document.getElementById('root'));
  });
};
