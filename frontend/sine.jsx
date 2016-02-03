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
var Header = require('./components/header.jsx');
var CurrentUserStore = require('./stores/current_user_store');
var SessionsApiUtil = require('./util/sessions_api_util');

var App = React.createClass({
  render: function() {
    return (
      <div className="app">
        < Header />
        {this.props.children}
     </div>
    );
  }
});

var FeedWrapper = React.createClass({
  render: function() {
    return (
      < Feed feedType="Feed" />
    );
  }
});

var TagFeedWrapper = React.createClass({
  render: function() {
    return (
      < Feed feedType="Tag" id={this.props.params.tagId} />
    );
  }
});

var router = (
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Feed} />
      <Route path="loops/:loopId" component={LoopShow} />
      <Route path="users/:userId" component={User} />
      <Route path="feed" component={FeedWrapper} onEnter={_ensureLoggedIn}/>
      <Route path="tag/:tagId" component={TagFeedWrapper} />
    </Route>
  </Router>
);

function _ensureLoggedIn(nextState, replace, callback) {

  if (CurrentUserStore.userHasBeenFetched()) {
    _redirectIfNotLoggedIn(); // this function below
  } else {
    SessionsApiUtil.fetchCurrentUser(_redirectIfNotLoggedIn);
  }

  function _redirectIfNotLoggedIn() {
    if (!CurrentUserStore.isLoggedIn()) {
      replace({}, "/");
    }
    callback();
  }
}

window.initializeSine = function(){
  document.addEventListener("DOMContentLoaded", function () {
    ReactDOM.render(router, document.getElementById('root'));
  });
};
