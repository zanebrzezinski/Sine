var React = require('react');
var LoopStore = require('../stores/loopStore.js');
var CurrentUserStore = require('../stores/current_user_store');
var SessionsApiUtil = require('../util/sessions_api_util');
var ApiUtil = require('../util/api_util.js');
var Loop = require('./loop');

var Feed = React.createClass({

  getInitialState: function() {
    var user;
    if (CurrentUserStore.userHasBeenFetched()) {
      user = CurrentUserStore.currentUser();
    } else {
      user = "";
    }

    if (typeof this.props.feedType === "undefined") {
      ApiUtil.fetchAllLoops();
    } else if (this.props.feedType === "Feed") {
      ApiUtil.fetchFeed();
    } else if (this.props.feedType === "User") {
      ApiUtil.fetchUserLoops(this.props.id);
    } else if (this.props.feedType === "Tag") {
      ApiUtil.fetchTagLoops(this.props.id);
    }

    return {loops: LoopStore.loops(), user: user};
  },

  componentDidMount: function() {
    this.userToken = CurrentUserStore.addListener(this._onUserChange);
    SessionsApiUtil.fetchCurrentUser();
    this.loopToken = LoopStore.addListener(this._onChange);
  },

  componentWillUnmount: function() {
    this.userToken.remove();
    this.loopToken.remove();
  },

  _onChange: function() {
    this.setState({loops: LoopStore.loops()});
  },

  _onUserChange: function() {
    this.setState({user: CurrentUserStore.currentUser()});
  },

  componentWillReceiveProps: function(newProps){
    if (typeof newProps.feedType === "undefined") {
      ApiUtil.fetchAllLoops();
    } else if (newProps.feedType === "Feed") {
      ApiUtil.fetchFeed();
    } else if (newProps.feedType === "Tag") {
      ApiUtil.fetchTagLoops(newProps.id);
    }

    this.setState({loops: LoopStore.loops()});
  },

  render: function() {
    var clickHandler = this._showFeedItem;
    var loops = this.state.loops.map(function(loop){
      return(
        <li key={loop.id}>< Loop loop={loop} user={this.state.user}/></li>
      );
    }.bind(this));
    if (loops.length === 0 && this.state.user !== "") {
      return(
        <div className="feed empty-feed">
          <p>It looks like nothing is here.</p>
          <p>You should try following some people.</p>
          <p><i className="fa fa-frown-o"></i></p>
        </div>
      );
    } else {
      return(
        <ul className="feed">
          {loops}
        </ul>
      );
    }

  }


});

module.exports = Feed;
