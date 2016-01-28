var React = require('react');
var LoopStore = require('../stores/loopStore.js');
var ApiUtil = require('../util/api_util.js');
var Loop = require('./loop');

var Feed = React.createClass({

  getInitialState: function() {
    if (typeof this.props.feedType === "undefined") {
      ApiUtil.fetchAllLoops();
      return {loops: LoopStore.loops()};
    } else if (this.props.feedType === "Feed") {
      ApiUtil.fetchFeed();
      return {loops: LoopStore.loops()};
    } else if (this.props.feedType === "User") {
      ApiUtil.fetchUserLoops(this.props.id);
      return {loops: LoopStore.loops()};
    }
  },

  componentDidMount: function() {
    this.loopListener = LoopStore.addListener(this._onChange);
  },


  //remove listener

  _onChange: function() {
    this.setState({loops: LoopStore.loops()});
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
