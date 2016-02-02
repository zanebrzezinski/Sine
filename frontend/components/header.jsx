var React = require('react');
var CurrentUserStore = require('../stores/current_user_store');
var SessionsApiUtil = require('../util/sessions_api_util');
var History = require('react-router').History;

var SignIn = require('./sign_in.jsx');
var VideoUpload = require('./video_upload');
var Search = require('./search.jsx');

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
      {signInModal: false, videoUploadModal: false, user: user}
    );
  },

  componentDidMount: function() {
    CurrentUserStore.addListener(this._onChange);
    SessionsApiUtil.fetchCurrentUser();
  },

  _onChange: function() {
    this.setState({user: CurrentUserStore.currentUser()});
  },

  handleSignInClick: function(){
    if (this.state.signInModal) {
      this.setState({signInModal: false});
    } else {
      this.setState({signInModal: true});
    }
  },

  handleVideoUploadClick: function() {
    if (this.state.videoUploadModal) {
      this.setState({videoUploadModal: false});
    } else {
      this.setState({videoUploadModal: true});
    }
  },

  logOut: function() {
    SessionsApiUtil.logout(this.history.pushState({}, "/"));
  },

  componentWillReceiveProps: function() {
    this.setState({signInModal: false});
  },

  render: function(){

    var loggedInContent;
    if (CurrentUserStore.isLoggedIn()) {
      loggedInContent = (
        <div>
          <nav className="nav-bar-icons">
            <a href="/#/feed"><i className="fa fa-home nav-bar-icon"></i></a>
            <a href="/"><i className="fa fa-eye nav-bar-icon"></i></a>
            <a onClick={this.handleVideoUploadClick}><i className="fa fa-video-camera nav-bar-icon"></i></a>
          </nav>
          <nav className="nav-bar-right">
            < Search />
            <img className="profile-picture" src={this.state.user.profile_picture} />
            <p onClick={this.logOut}>Sine Out</p>
          </nav>
        </div>
      );
    } else {
      loggedInContent = (
        <div>
          <nav className="nav-bar-icons">
            <a href="/"><i className="fa fa-eye nav-bar-icon"></i></a>
          </nav>
          <nav className="nav-bar-right">
            < Search />
            <p onClick={this.handleSignInClick}>Sine in</p>
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

    if (this.state.signInModal) {
      return (
        <div>
          <SignIn handleClick={this.handleSignInClick}/>
          {content}
        </div>
      );
    } else if (this.state.videoUploadModal) {
      return (
        <div>
          <VideoUpload handleClick={this.handleVideoUploadClick}/>
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
