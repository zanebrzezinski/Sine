var React = require('react');
ApiUtil = require('../util/api_util.js');
var Loop = require('./loop');
var ShowCard = require('./showCard');
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

  _onChange: function() {
    this.setState({loop: LoopStore.loops()[0]});
  },

  render: function(){
    if (this.state.loop) {
      return(
        <div className="loop-box-show group">
          < ShowCard loop={this.state.loop}/>
          < Loop loop={this.state.loop} videoOnly={true}/>
        </div>
      );
    } else {
      return(
        <div></div>
      );
    }

  }
});

module.exports = LoopShow;
