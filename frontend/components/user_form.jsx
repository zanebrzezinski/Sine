var React = require('react');
var ApiUtil = require('../util/api_util');
var CurrentUserStore = require('../stores/current_user_store');

var UserForm = React.createClass({

  getInitialState: function() {
    return(
      {username: "", password: "", profilePicture: null, profilePictureUrl: "https://s3.amazonaws.com/sine-dev/users/profile_pictures/000/000/016/original/sine_wave.jpg"}
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

    formData.append("user[username]", this.state.username);
    formData.append("user[password]", this.state.password);
    formData.append("user[profile_picture]", this.state.profilePicture);
    ApiUtil.createUser(formData, function(){
      debugger;
      this.props.handleClick();
    });

  },

  render: function(){
    return(
    <div className='modal sign-up'>
      <h2>Sine Up</h2>
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
