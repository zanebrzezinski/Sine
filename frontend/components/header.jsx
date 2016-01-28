var React = require('react');

var Header = React.createClass({
  render: function(){
    return (
      <header>
        <header className="navbar group">
          <a href="/"><i className="fa fa-eye"></i></a>
          <nav className="signed-out">
            <a href="sessions/new">Sine in</a>
          or
            <a href="users/new">Create an Account</a>
          </nav>
        </header>
      </header>
    );
  }
});

module.exports = Header;
