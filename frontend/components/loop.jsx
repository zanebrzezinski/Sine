var React = require('react');

var Loop = React.createClass({

  getInitialState: function(){
    return (
      {muted: true, date_created: new Date(this.props.loop.created_at)}
    );
  },

  render: function() {
    return(
      <div className="loop-box">
        <div className="author">{this.props.loop.author}</div>
        <video className="loop" loop controls autoPlay muted src={this.props.loop.url}/>
      </div>
    );
  }
});

module.exports = Loop;
