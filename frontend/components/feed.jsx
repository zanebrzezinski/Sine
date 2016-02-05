var React = require('react');
var LoopStore = require('../stores/loopStore.js');
var CurrentUserStore = require('../stores/current_user_store');
var SessionsApiUtil = require('../util/sessions_api_util');
var ApiUtil = require('../util/api_util.js');
var Loop = require('./loop');

var Feed = React.createClass({

  getInitialState: function() {
    var user;
    if (CurrentUserStore.userHasBeenFetched()) {
      user = CurrentUserStore.currentUser();
    } else {
      user = "";
    }
    this.determineFeedTypeAndFetch(this.props.feedType, 1);
    return {loops: LoopStore.loops(), user: user, page: 1, lastPage: false};
  },

  determineFeedTypeAndFetch: function(feedType, page){

    var cb = function(){
      window.scroll(0, 0);

      if (this.state.page > 1 && LoopStore.loops().length === 0) {
        this.setState({page: this.state.page - 1, lastPage: true});
      }
    };


    if (typeof feedType === "undefined") {
      ApiUtil.fetchAllLoops(page, cb);
    } else if (feedType === "Feed") {
      ApiUtil.fetchFeed(page, cb);
    } else if (feedType === "User") {
      ApiUtil.fetchUserLoops(this.props.id, page, cb);
    } else if (feedType === "Tag") {
      ApiUtil.fetchTagLoops(this.props.id, page, cb);
    } else if (feedType === "Likes") {
      ApiUtil.fetchLikeLoops(this.props.id, page, cb);
    }
  },

  componentDidMount: function() {
    this.userToken = CurrentUserStore.addListener(this._onUserChange);
    SessionsApiUtil.fetchCurrentUser();
    this.loopToken = LoopStore.addListener(this._onChange);
  },

  nextPage: function() {
    var nextPage = this.state.page + 1;
    this.determineFeedTypeAndFetch(this.props.feedType, nextPage);
    this.setState({page: nextPage});
  },

  prevPage: function() {
    var prevPage = this.state.page - 1;
    this.determineFeedTypeAndFetch(this.props.feedType, prevPage);
    this.setState({page: prevPage, lastPage: false});
    window.scroll(0, 0);
  },

  componentWillUnmount: function() {
    this.userToken.remove();
    this.loopToken.remove();
  },

  _onChange: function() {
    if (this.state.page > 1 && LoopStore.loops().length === 0) {
      this.setState({page: this.state.page - 1});
      this.setState({lastPage: true});
    } else {
      this.setState({loops: LoopStore.loops()});
    }
  },

  _onUserChange: function() {
    this.setState({user: CurrentUserStore.currentUser()});
  },

  componentWillReceiveProps: function(newProps){
    this.determineFeedTypeAndFetch(newProps.feedType, 1);
    this.setState({loops: LoopStore.loops()});
  },

  render: function() {
    var clickHandler = this._showFeedItem;
    var loops = this.state.loops.map(function(loop){
      return(
        <li key={loop.id}>< Loop loop={loop} user={this.state.user}/></li>
      );
    }.bind(this));

    var buttons;

    if (this.state.page > 1 && this.state.lastPage === false) {
      buttons = (
        <div className="page-buttons">
          <button className="page-button prev" onClick={this.prevPage}>Previous</button>
          <button className="page-button" onClick={this.nextPage}>Next</button>
        </div>
      );
    } else if (this.state.lastPage === true) {
      buttons = (
        <div className="page-buttons">
          <button className="page-button prev" onClick={this.prevPage}>Previous</button>
        </div>
      );
    } else {
      buttons = (
        <div className="page-buttons">
          <button className="page-button" onClick={this.nextPage}>Next</button>
        </div>
      );
    }


    if (loops.length === 0 && this.state.user !== "") {
      return(
        <div className="feed empty-feed">
          <p>It looks like nothing is here.</p>
          <p><i className="fa fa-frown-o"></i></p>
        </div>
      );
    } else {
      return(
        <div className="feed">
          <ul >
            {loops}
          </ul>
            {buttons}
        </div>
      );
    }
  }
});

module.exports = Feed;
