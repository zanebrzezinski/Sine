var React = require('react');
ApiUtil = require('../util/api_util.js');
var Loop = require('./loop');
// var ShowCard = require('./showCard');
var LoopStore = require('../stores/loopStore.js');


var LoopShow = React.createClass({

  getInitialState: function() {
    return {loop: LoopStore.loops()[0]};
  },

  componentDidMount: function() {
    ApiUtil.fetchOneLoop(this.props.params.loopId);
    this.token = LoopStore.addListener(this._onChange);
  },

  componentWillUnmount: function() {
    this.token.remove();
  },

  componentWillReceiveProps: function(newProps) {
    ApiUtil.fetchOneLoop(newProps.params.loopId);
  },

  _onChange: function() {
    this.setState({loop: LoopStore.loops()[0]});
  },

  render: function(){
    if (this.state.loop) {
      return(
        <ul className="feed">
            <li>
            < Loop loop={this.state.loop}/>
          </li>
        </ul>
      );
    } else {
      return(
        <div></div>
      );
    }

  }
});

module.exports = LoopShow;
