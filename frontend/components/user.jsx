var React = require('react');
var Feed = require('./feed.jsx');
var UserCard = require('./user_card.jsx');


var User = React.createClass({

  render: function() {
    return (
      <div>
        < UserCard />
        < Feed feedType="User" id={this.props.params.userId} />
      </div>
    );
  }

});

module.exports = User;
