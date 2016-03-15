var React = require('react');
var Feed = require('./feed.jsx');
var UserStore = require('../stores/user_store');

var UsersList = require('./users_list');

var UserCard = React.createClass({

  getInitialState: function() {
    return(
        {user: UserStore.user()[0], userClass: "", likesClass: "greyed", list: null}
    );
  },

  componentDidMount: function(){
    this.token = UserStore.addListener(this._onChange);
    this.setState({user: UserStore.user()});
  },

  componentWillUnmount: function(){
    this.token.remove();
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

  showFollowers: function() {
    this.setState({list: "followers"});
  },

  showFollowings: function() {
    this.setState({list: "followings"});
  },

  clickHandler: function() {
    this.setState({list: null});
  },

  render: function() {

    var list;
    if (this.state.list === "followers") {
      list = <UsersList users={this.state.user.followers} clickHandler={this.clickHandler}/>;
    } else if (this.state.list === "followings") {
      list = <UsersList users={this.state.user.followed_users} clickHandler={this.clickHandler}/>;
    }

    if (this.state.user && this.state.user.length !== 0) {
      return (
        <div className="card">
          <div className="card-info">
            <img className="profile-picture-large" src={this.state.user.profile_picture} />
            <h1>{this.state.user.username}</h1>
            <div className="card-sub-info">
              <div className="followers" onClick={this.showFollowers}>
                <div className="followers-count">{this.state.user.followers.length}</div>
                <div className="followers-word">Followers</div>
              </div>
              <div className="followings" onClick={this.showFollowings}>
                <div className="followings-count">{this.state.user.followed_users.length} </div>
                <div className="followings-word">Following</div>
              </div>
              {list}
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
