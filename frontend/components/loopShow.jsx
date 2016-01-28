var React = require('react');
var ApiUtil = require('../util/api_util.js');
var Loop = require('./loop');
var LoopStore = require('../stores/loopStore.js');


var LoopShow = React.createClass({

  getInitialState: function() {
    ApiUtil.fetchOneLoop(this.props.params.loopId);
    debugger
    return (
      {loop: LoopStore.loops()}
    );
  },

  componentDidMount: function() {
    LoopStore.addListener(this._onChange);
  },

  _onChange: function() {
    console.log("STORE CHANGED LOL");
  },


  render: function(){
    return(
      <div className="loop-box-show">
        < Loop loop={this.state.loop} />
      </div>
    );
  }
});

module.exports = LoopShow;
