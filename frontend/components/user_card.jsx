var React = require('react');
var Feed = require('./feed.jsx');
var UserStore = require('../stores/user_store');

var UserCard = React.createClass({

  getInitialState: function() {
    return(
        {user: UserStore.user()[0], userClass: "", likesClass: "greyed"}
    );
  },

  componentDidMount: function(){
    this.token = UserStore.addListener(this._onChange);
    this.setState({user: UserStore.user()});
  },

  _onChange: function(){
    this.setState({user: UserStore.user()[0]});
  },

  likeFeed: function() {
    console.log("users greyed");
    this.setState({userClass: "greyed", likesClass: ""});
    this.props.likeFeed();
  },

  userFeed: function() {
    this.setState({userClass: "", likesClass: "greyed"});
    this.props.userFeed();
  },

  render: function() {

    if (this.state.user && this.state.user.length !== 0) {
      return (
        <div className="user-card">
          <div className="user-info">
            <img className="profile-picture-large" src={this.state.user.profile_picture} />
            <h1>{this.state.user.username}</h1>
            <div className="follow-info">
              <div className="followers">
                <div className="followers-count">{this.state.user.followers.length}</div>
                <div className="followers-word">Followers</div>
              </div>
              <div className="followings">
                <div className="followings-count">{this.state.user.followed_users.length} </div>
                <div className="followings-word">Following</div>
              </div>
            </div>
          </div>
          <div className = "social-info">
            <div className={"user-social-info " + this.state.userClass} onClick={this.userFeed}>
              {this.state.user.loops.length} Posts</div>

            <div className={"user-social-info " + this.state.likesClass} onClick={this.likeFeed}>
              {this.state.user.likes.length} Likes</div>
          </div>
        </div>
      );
    } else {
      return (
        <div></div>
      );
    }

  }

});

module.exports = UserCard;
