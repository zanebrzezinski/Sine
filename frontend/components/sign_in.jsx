var React = require('react');

var SignIn = React.createClass({

  getInitialState: function(){

    return {username: "", password: ""};

  },

  onChange: function(e) {
    if (e.currentTarget.placeholder === "Username") {
      this.setState({username: e.currentTarget.value});
    } else {
      this.setState({password: e.currentTarget.password});
    }
  },

  render: function(){
    return(
    <div>
      <div  className='modal-cover' onClick={this.props.handleClick} />
      <div className="userform-partial">

      <h1>Sine</h1>
      <h2>Sign in</h2>

        <form className="userform group" method="post">
            <input className="textbox" type="text" placeholder="Username" onChange={this.onChange} value={this.state.username}/>
            <input className="textbox" type="password" placeholder="Password" onChange={this.onChange} value={this.state.password}/>
            <button className='form-button'>Sine in</button>
        </form>

      </div>
    </div>
    );
  }

});

module.exports = SignIn;
