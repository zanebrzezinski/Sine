var LoopStore = require('../stores/loopStore.js');
var CurrentUserStore = require('../stores/current_user_store');
var SessionsApiUtil = require('../util/sessions_api_util');
var ApiUtil = require('../util/api_util.js');
var Loop = require('./loop');

var Feed = React.createClass({displayName: "Feed",

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
        React.createElement("li", {key: loop.id}, React.createElement(Loop, {loop: loop, user: this.state.user}))
      );
    }.bind(this));

    var buttons;

    if (this.state.page > 1 && this.state.lastPage === false) {
      buttons = (
        React.createElement("div", {className: "page-buttons"}, 
          React.createElement("button", {className: "page-button prev", onClick: this.prevPage}, "Previous"), 
          React.createElement("button", {className: "page-button", onClick: this.nextPage}, "Next")
        )
      );
    } else if (this.state.lastPage === true) {
      buttons = (
        React.createElement("div", {className: "page-buttons"}, 
          React.createElement("button", {className: "page-button prev", onClick: this.prevPage}, "Previous")
        )
      );
    } else {
      buttons = (
        React.createElement("div", {className: "page-buttons"}, 
          React.createElement("button", {className: "page-button", onClick: this.nextPage}, "Next")
        )
      );
    }


    if (loops.length === 0 && this.state.user !== "") {
      return(
        React.createElement("div", {className: "feed empty-feed"}, 
          React.createElement("p", null, "It looks like nothing is here."), 
          React.createElement("p", null, React.createElement("i", {className: "fa fa-frown-o"}))
        )
      );
    } else {
      return(
        React.createElement("div", {className: "feed"}, 
          React.createElement("ul", null, 
            loops
          ), 
            buttons
        )
      );
    }
  }
});

module.exports = Feed;