var React = require('react');
var CurrentUserStore = require('../stores/current_user_store');
var SessionsApiUtil = require('../util/sessions_api_util');
var History = require('react-router').History;

var SignIn = require('./sign_in.jsx');

var Header = React.createClass({
  mixins: [History],

  getInitialState: function(){
    var user;
    if (CurrentUserStore.userHasBeenFetched) {
      user = CurrentUserStore.currentUser;
    } else {
      user = "";
    }
    return(
      {modal: false, user: user}
    );
  },

  componentDidMount: function() {
    CurrentUserStore.addListener(this._onChange);
    SessionsApiUtil.fetchCurrentUser();
  },

  _onChange: function() {
    this.setState({user: CurrentUserStore.currentUser()});
  },

  handleClick: function(){
    if (this.state.modal) {
      this.setState({modal: false});
    } else {
      this.setState({modal: true});
    }
  },

  logOut: function() {
    SessionsApiUtil.logout(this.history.pushState({}, "/"));
  },

  componentWillReceiveProps: function() {
    this.setState({modal: false});
  },

  render: function(){

    var loggedInContent;
    if (CurrentUserStore.isLoggedIn()) {
      loggedInContent = (
        <div>
          <nav className="nav-bar-right">
            <a href="/"><i className="fa fa-eye"></i></a>
            <img className="profile-picture" src={this.state.user.profile_picture} />
            <p onClick={this.logOut}>Sine Out</p>
          </nav>
        </div>
      );
    } else {
      loggedInContent = (
        <div>
          <nav className="nav-bar-right">
            <a href="/"><i className="fa fa-eye"></i></a>
            <p onClick={this.handleClick} href="sessions/new">Sine in</p>
          </nav>
        </div>
      );
    }

    var content = (
      <header>
        <header className="navbar group">
        {loggedInContent}
        </header>
      </header>
    );

    if (this.state.modal) {
      return (
        <div>
          <SignIn handleClick={this.handleClick}/>
          {content}
        </div>
      );
    } else {
      return (
        <div>
          {content}
        </div>
      );
    }
  }
});

module.exports = Header;
