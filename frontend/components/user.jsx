var React = require('react');
var Feed = require('./feed.jsx');
var UserCard = require('./user_card.jsx');


var User = React.createClass({

  getInitialState: function() {
    return (
      {feedType: "User"}
    );
  },

  likeFeed: function() {
    if (this.state.feedType === "User") {
      this.setState({feedType: "Likes"});
    }
  },

  userFeed: function() {
    if (this.state.feedType === "Likes") {
      this.setState({feedType: "User"});
    }
  },

  render: function() {
    return (
      <div>
        < UserCard likeFeed={this.likeFeed} userFeed={this.userFeed}/>
      < Feed feedType={this.state.feedType}
      id={this.props.params.userId} /></div>
    );
  }

});

module.exports = User;
