var React = require('react');
ApiUtil = require('../util/api_util.js');
var Loop = require('./loop');
var LoopStore = require('../stores/loopStore.js');


var LoopShow = React.createClass({

  getInitialState: function() {
    ApiUtil.fetchOneLoop(this.props.params.loopId);
    return {loop: LoopStore.loops()[0]};
  },

  componentDidMount: function() {
    LoopStore.addListener(this._onChange);
  },

  _onChange: function() {
    this.setState({loop: LoopStore.loops()[0]});
  },


  render: function(){
    if (this.state.loop) {
      return(
        <div className="loop-box-show">
          < Loop loop={this.state.loop} />
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
