var React = require('react');
CurrentUserStore = require('../stores/current_user_store');

var SignIn = require('./sign_in.jsx');

var Header = React.createClass({

  getInitialState: function(){
    var user;
    if (CurrentUserStore.userHasBeenFetched) {
      user = CurrentUserStore.currentUser;
    } else {
      user = "";
    }
    return(
      {modal: false, user: user}
    );
  },

  componentDidMount: function() {
    CurrentUserStore.addListener(this._onChange);
  },

  _onChange: function() {
    if (CurrentUserStore.userHasBeenFetched) {
      user = CurrentUserStore.currentUser();
    } else {
      user = "";
    }
    this.setState({user: user});
    debugger;
  },

  handleClick: function(){
    if (this.state.modal) {
      this.setState({modal: false});
    } else {
      this.setState({modal: true});
    }
  },

  componentWillReceiveProps: function() {
    this.setState({modal: false});
  },

  render: function(){
    var content = (
      <header>
        <header className="navbar group">
          <a href="/"><i className="fa fa-eye"></i></a>
          <nav className="signed-out">
          <img className="profile-picture" src={this.state.user.profile_picture} />
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
