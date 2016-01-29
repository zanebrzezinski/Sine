var React = require('react');
var History = require('react-router').History;
var SessionsApiUtil = require('../util/sessions_api_util');

var SignIn = React.createClass({
  mixins: [History],

  submit: function (e) {
    e.preventDefault();

    var credentials = $(e.currentTarget).serializeJSON();

    SessionsApiUtil.login(credentials, function() {
      this.props.handleClick();
    }.bind(this));

  },

  render: function(){
    return(
    <div>
      <div  className='modal-cover' onClick={this.props.handleClick} />
      <div className="userform-partial">

      <h1>Sine</h1>
      <h2>Sign in</h2>

        <form className="userform group" onSubmit={this.submit} method="post">
            <input className="textbox" type="text" name="username" placeholder="Username" />
            <input className="textbox" type="password" name="password" placeholder="Password" />
            <div className="form-buttons">
              <button className='form-button'>Sine in</button>
                or
              <a href="#">Sine Up!</a>
            </div>
        </form>

      </div>
    </div>
    );
  }

});

module.exports = SignIn;
