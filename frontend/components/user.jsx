var React = require('react');
var Feed = require('./feed.jsx');

var User = React.createClass({

  render: function() {
    return (
      <div>
        < Feed feedType="User" id={this.props.params.userId} />
      </div>
    );
  }

});

module.exports = User;
