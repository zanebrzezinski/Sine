var React = require('react');
var History = require('react-router').History;
var SessionsApiUtil = require('../util/sessions_api_util');
var UserForm = require('./user_form');

var SignIn = React.createClass({
  mixins: [History],

  getInitialState: function() {
    return {signUp: false};
  },

  submit: function (e) {
    e.preventDefault();

    var credentials = $(e.currentTarget).serializeJSON();

    SessionsApiUtil.login(credentials, function() {
      this.props.handleClick();
    }.bind(this));

  },

  renderUserForm: function(e) {
    e.preventDefault();
    this.setState({signUp: true});
  },

  render: function(){
    if (!this.state.signUp) {
      return(
      <div>
        <div  className='modal-cover' onClick={this.props.handleClick} />
        <div className="modal sign-in">

          <h1>Sine</h1>
          <h2>Sign in</h2>

            <form className="userform group" onSubmit={this.submit} method="post">
                <input className="textbox" type="text" name="username" placeholder="Username" />
                <input className="textbox" type="password" name="password" placeholder="Password" />
                <div className="form-buttons">
                  <button className='form-button'>Sine in</button>
                    or
                  <button className='form-button' onClick={this.renderUserForm}>Sine Up</button>
                </div>
            </form>

        </div>
      </div>
      );
    } else {
      return (
        <div>
          <div  className='modal-cover' onClick={this.props.handleClick} />
          < UserForm />
        </div>
      );
    }

  }

});

module.exports = SignIn;
