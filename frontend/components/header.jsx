var React = require('react');

var SignIn = require('./sign_in.jsx');

var Header = React.createClass({

  getInitialState: function(){
    return(
      {modal: false}
    );
  },

  handleClick: function(){
    if (this.state.modal) {
      this.setState({modal: false});
    } else {
      this.setState({modal: true});
    }
  },

  render: function(){

    var content = (
      <header>
        <header className="navbar group">
          <a href="/"><i className="fa fa-eye"></i></a>
          <nav className="signed-out">
            <p onClick={this.handleClick} href="sessions/new">Sine in</p>
          </nav>
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
