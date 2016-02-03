var React = require('react');
var ApiUtil = require('../util/api_util.js');
var CurrentUserStore = require('../stores/current_user_store');
var SessionsApiUtil = require('../util/sessions_api_util');
var Loop = require('./loop');
var LoopStore = require('../stores/loopStore.js');


var LoopShow = React.createClass({

  getInitialState: function() {
    var user;
    if (CurrentUserStore.userHasBeenFetched()) {
      user = CurrentUserStore.currentUser();
    } else {
      user = "";
    }
    return {loop: LoopStore.loops()[0], user: user};
  },

  componentDidMount: function() {
    ApiUtil.fetchOneLoop(this.props.params.loopId);
    this.userToken = CurrentUserStore.addListener(this._onUserChange);
    SessionsApiUtil.fetchCurrentUser();
    this.token = LoopStore.addListener(this._onChange);
  },

  componentWillUnmount: function() {
    this.token.remove();
    this.userToken.remove();
  },

  componentWillReceiveProps: function(newProps) {
    ApiUtil.fetchOneLoop(newProps.params.loopId);
  },

  _onChange: function() {
    this.setState({loop: LoopStore.loops()[0]});
  },

  _onUserChange: function() {
    this.setState({user: CurrentUserStore.currentUser()});
  },

  render: function(){
    if (this.state.loop) {
      return(
        <ul className="feed">
            <li>
            < Loop loop={this.state.loop} user={this.state.user}/>
          </li>
        </ul>
      );
    } else {
      return(
        <div></div>
      );
    }

  }
});

module.exports = LoopShow;
