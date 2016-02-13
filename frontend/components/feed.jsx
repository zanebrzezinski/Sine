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

    if (this.props.id) {
      this.determineFeedTypeAndFetch(this.props.feedType, 1, this.props.id);
    } else {
      this.determineFeedTypeAndFetch(this.props.feedType, 1);
    }

    return {loops: LoopStore.loops(), user: user, page: 1, lastPage: false};
  },

  determineFeedTypeAndFetch: function(feedType, page, id){

    var cb = function(tag){
      if (tag) {
        this.setState({tag: tag});
      }
      window.scroll(0, 0);
    }.bind(this);

    if (typeof feedType === "undefined") {
      ApiUtil.fetchAllLoops(page, cb);
    } else if (feedType === "Feed") {
      ApiUtil.fetchFeed(page, cb);
    } else if (feedType === "User") {
      ApiUtil.fetchUserLoops(id, page, cb);
    } else if (feedType === "Tag") {
      ApiUtil.fetchTagLoops(id, page, cb);
    } else if (feedType === "Likes") {
      ApiUtil.fetchLikeLoops(id, page, cb);
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
    if (this.props.id) {
      this.determineFeedTypeAndFetch(newProps.feedType, 1, newProps.id);
    } else {
      this.determineFeedTypeAndFetch(newProps.feedType, 1);
    }
    this.setState({loops: LoopStore.loops()});
  },

  addFollowing: function(followee_id){
    var currentUser = this.state.user;
    var data = {follower_id: currentUser.id, followee_id: followee_id};
    ApiUtil.createFollowing(data, function(){
      this.forceUpdate();
    }.bind(this));
  },

  removeFollowing: function(followingId){
    ApiUtil.destroyFollowing(followingId, function(){
      this.forceUpdate();
    }.bind(this));
  },

  render: function() {
    var clickHandler = this._showFeedItem;
    var loops = this.state.loops.map(function(loop){

      var followingId;
      if (this.state.user.id) {
        loop.author_followers.array.forEach (function(follower){
          if (this.state.user.id === follower.follower) {
            followingId = follower.id;
            return;
          }
        }.bind(this));
      }

      return(
        <li key={loop.id}><Loop loop={loop} user={this.state.user}
        followingId={followingId} addFollowing={this.addFollowing}
        removeFollowing={this.removeFollowing}/></li>
      );
    }.bind(this));

    var card;
    if (this.props.feedType === "Feed") {
      card = (<div className="card">
        <div className="card-info">
          <h1>Feed</h1>
        </div>
      </div>);
    } else if (this.props.feedType === "Tag" && this.state.tag) {
      card = (<div className="card">
        <div className="card-info">
          <h1>{"#" + this.state.tag}</h1>
          <div className="loop-count">
            <div>{loops.length + " loops"}</div>
          </div>
        </div>
      </div>);
    }
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
        <div>
          {card}
          <div className="feed">
            <ul >
              {loops}
            </ul>
              {buttons}
          </div>
        </div>
      );
    }
  }
});

module.exports = Feed;
