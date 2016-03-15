var React = require('react');

var UsersList = React.createClass({
  render: function() {
    var users = this.props.users.map(function(user){
      return (
        <li key={user.username} className="userlist-item">{"@" + user.username}</li>
      );
    });

    return(
      <div className="userlist group">
        <span><i className="fa fa-times close-button" onClick={this.props.clickHandler}></i></span>
        <ul className="userlist-list">
          {users}
        </ul>
      </div>
    );
  }
});

module.exports = UsersList;
