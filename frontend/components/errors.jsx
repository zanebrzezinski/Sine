var React = require('react');
var ErrorStore = require('../stores/error_store');

var Errors = React.createClass({

  getInitialState: function(){
    return(
      {modal: false}
    );
  },

  componentDidMount: function(){
    this.token = ErrorStore.addListener(this._onChange);
  },

  componentWillUnmount: function(){
    this.token.remove();
  },

  _onChange: function(){
    this.setState({modal: true});
  },

  removeModal: function(){
    this.setState({modal: false});
  },

  render: function(){

    if (this.state.modal) {
      return (
        <div>
          <div onClick={this.removeModal} className="error-modal">
          </div>
          <div onClick={this.removeModal} className="error">
            ERROR LOL
          </div>
        </div>
      );
    } else {
      return (
        <div></div>
      );
    }
  }


});

module.exports = Errors;
