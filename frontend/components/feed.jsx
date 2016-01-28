var React = require('react');
var LoopStore = require('../stores/loopStore.js');
var ApiUtil = require('../util/api_util.js');
var Loop = require('./loop');

var Feed = React.createClass({

  getInitialState: function() {
    //come back later when you have more feed types

    ApiUtil.fetchAllLoops();
    return {loops: LoopStore.all()};

  },

  componentDidMount: function() {
    LoopStore.addListener(this._onChange);
  },

  _onChange: function() {
    this.setState({loops: LoopStore.all()});
  },

  render: function() {
    var clickHandler = this._showFeedItem;
    var loops = this.state.loops.map(function(loop){
      return(
        <li key={loop.id}>< Loop loop={loop}/></li>
      );
    });

    return(
      <ul className="feed">
        {loops}
      </ul>
    );
  }

});

module.exports = Feed;
