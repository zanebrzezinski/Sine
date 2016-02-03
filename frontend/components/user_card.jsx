var React = require('react');
var Feed = require('./feed.jsx');
var UserStore = require('../stores/user_store');

var UserCard = React.createClass({

  getInitialState: function() {
    return(
        {user: UserStore.user()[0]}
    );
  },

  componentDidMount: function(){
    this.token = UserStore.addListener(this._onChange);
    this.setState({user: UserStore.user()});
  },

  _onChange: function(){
    this.setState({user: UserStore.user()[0]});
  },

  render: function() {

    if (this.state.user && this.state.user.length !== 0) {
      return (
        <div className="user-card">
          <div className="user-info">
            <img className="profile-picture-large" src={this.state.user.profile_picture} />
            <h1>{this.state.user.username}</h1>
          </div>
          <div className = "social-info">
            <div className="posts">{this.state.user.loops.length} Posts</div>
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
