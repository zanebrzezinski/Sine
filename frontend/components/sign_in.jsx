var React = require('react');
var History = require('react-router').History;
var SessionsApiUtil = require('../util/sessions_api_util');
var UserForm = require('./user_form');

var SignIn = React.createClass({
  mixins: [History],

  getInitialState: function() {
    return {signUp: false, error: null};
  },

  submit: function (e) {
    e.preventDefault();

    if (e.currentTarget.username.value === "" || e.currentTarget.password.value === "") {
      var errors = [];
      if (e.currentTarget.username.value === "") {
        errors.push(" Please enter a username");
      }
      if (e.currentTarget.password.value === "") {
        errors.push(" Please enter a password");
      }
      this.setState({error: errors});
      return;
    }

    var credentials = $(e.currentTarget).serializeJSON();

    SessionsApiUtil.login(credentials, function() {
      this.props.handleClick();
    }.bind(this), function() {
      var errors = this.state.error || [];
      errors.push("Invalid Login Details");
      this.setState({error: errors});
    }.bind(this));

  },

  renderUserForm: function(e) {
    e.preventDefault();
    this.setState({signUp: true});
  },

  render: function(){
    if (!this.state.signUp) {

      var errors;
      if (this.state.error) {
        errors = this.state.error.map(function(error){
          return(
            <li key={error} className="error">{error}</li>
          );
        });
      }

      return(
      <div>
        <div  className='modal-cover' onClick={this.props.handleClick} />
        <div className="modal sign-in">

          <h1>Sine</h1>
          <h2>Sine in</h2>
            <form onSubmit={this.submit}>
              <input type="hidden" name="username" value="guest"/>
              <input type="hidden" name="password" value="password"/>
              <button className="form-button guest">Guest Sign In</button>
            </form>
            <ul>{errors}</ul>
            <form className="userform group" onSubmit={this.submit}>
                <input className="textbox" type="text" name="username" placeholder="Username" />
                <input className="textbox" type="password" name="password" placeholder="Password" />
                <div className="form-buttons">
                  <button className='form-button'>Sine in</button>
                    or
                  <button className='form-button' onClick={this.renderUserForm}>Sine Up</button>
                    or
                  <a className="twitter" href="/auth/twitter"><i className="fa fa-twitter"></i></a>
                </div>
            </form>

        </div>
      </div>
      );
    } else {
      return (
        <div>
          <div  className='modal-cover' onClick={this.props.handleClick} />
          < UserForm handleClick={this.props.handleClick}/>
        </div>
      );
    }

  }

});

module.exports = SignIn;
