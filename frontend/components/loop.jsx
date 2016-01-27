var React = require('react');

var Loop = React.createClass({


  render: function() {
    return(
      <video className="loop" loop controls autoPlay muted
        src={this.props.loop.url}
      />
    );
  }
});

module.exports = Loop;
