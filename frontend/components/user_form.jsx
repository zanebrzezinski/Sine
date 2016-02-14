var React = require('react');
var ApiUtil = require('../util/api_util');
var SessionsApiUtil = require('../util/sessions_api_util');

var UserForm = React.createClass({

  getInitialState: function() {
    return(
      {username: "", password: "", profilePicture: null,
      error: null,
      profilePictureUrl: "https://s3.amazonaws.com/sine-dev/users/profile_pictures/000/000/016/original/sine_wave.jpg"}
    );
  },

  changeUsername: function(e){
    this.setState({username: e.currentTarget.value});
  },

  changePassword: function(e){
    this.setState({password: e.currentTarget.value});
  },

  changeFile: function(e) {
    var reader = new FileReader();
    var file = e.currentTarget.files[0];

    if (file.type.slice(0,5) !== "image") {
      var errors = this.state.error || [];
      errors.push("Please select a valid profile picture");
      this.setState({error: errors});
      return;
    }

    reader.onloadend = function () {
      this.setState({profilePicture: file, profilePictureUrl: reader.result});
    }.bind(this);

    if (file) {
      reader.readAsDataURL(file); // will trigger a load end event when it completes, and invoke reader.onloadend
    } else {
      this.setState({profilePicture: null, profilePictureUrl: "https://s3.amazonaws.com/sine-dev/users/profile_pictures/000/000/016/original/sine_wave.jpg"});
    }
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var formData = new FormData();
    if (this.state.username === "" || this.state.password === "" || this.state.password.length < 6) {
      var errors = [];
      if (this.state.username === "") {
        errors.push(" Please enter a username");
      }
      if (this.state.password === "") {
        errors.push(" Please enter a password");
      } else if (this.state.password.length < 6) {
        errors.push(" Password too short.  Passwords must be 6 characters or greater");
      }
      this.setState({error: errors});
      return;
    }

    formData.append("user[username]", this.state.username);
    formData.append("user[password]", this.state.password);
    if (this.state.profilePicture) {
      formData.append("user[profile_picture]", this.state.profilePicture);
    }
    ApiUtil.createUser(formData, function(user){
      var credentials = {username: this.state.username, password: this.state.password};
      SessionsApiUtil.login(credentials, function() {
        this.props.handleClick();
      }.bind(this));
    }.bind(this), function(){
      this.setState({error: "Invalid User info.  Please try another username"});
    }.bind(this));

  },

  render: function(){
    var errors;
    if (this.state.error) {
      errors = this.state.error.map(function(error){
        return(
          <li key={error} className="error">{error}</li>
        );
      });
    }

    return(
    <div className='modal sign-up'>
      <h2>Sine Up</h2>
      <ul>{errors}</ul>
      <img className="profile-picture" src={this.state.profilePictureUrl}/>
      <form onSubmit={this.handleSubmit} className="userform group">
        <input className="textbox" onChange={this.changeUsername} placeholder="Username" type="text" name="username" value={this.state.username}/>
        <input className="textbox" onChange={this.changePassword} placeholder="Password" type="password" name="password" value={this.state.password}/>
        <p>Profile Picture:</p>
        <input className="file-upload" type="file" onChange={this.changeFile}/>
        <button className="form-button">Sine Up!</button>
      </form>
    </div>
    );
  }
});

module.exports = UserForm;
