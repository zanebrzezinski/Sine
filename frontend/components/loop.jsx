var React = require('react');
var CurrentUserStore = require('../stores/current_user_store');
var SessionsApiUtil = require('../util/sessions_api_util');
var ApiUtil = require('../util/api_util');


var Loop = React.createClass({

  getInitialState: function(){
    var user;
    if (CurrentUserStore.userHasBeenFetched()) {
      user = CurrentUserStore.currentUser();
    } else {
      user = "";
    }

    return (
      {muted: "muted", paused: false, comment: null, user: user,
        likes: this.props.loop.likes.array.length, liked: false}
    );
  },

  componentDidMount: function() {
    this.token = CurrentUserStore.addListener(this._onChange);
    SessionsApiUtil.fetchCurrentUser();
    this.searchForLike();

  },

  searchForLike: function(){
    var likeId;
    this.props.loop.likes.array.forEach (function(like){
      if (this.state.user.id === like.liker_id) {
        this.setState({liked: true});
        likeId = like.id;
        return;
      }
      this.setState({liked: false});
    }.bind(this));
    return likeId;
  },

  _onChange: function() {
    this.setState({user: CurrentUserStore.currentUser()});
    this.searchForLike();
  },

  componentWillUnmount: function() {
    this.token.remove();
  },

  commentChange: function(e){
    this.setState({comment: e.currentTarget.value});
  },

  muteLogic: function(e){
    if (this.state.muted === "muted") {
      this.setState({muted: ""});
    } else {
      this.setState({muted: "muted"});
    }
  },

  pauseLogic: function(e){
    if (this.state.paused) {
      this.setState({paused: false});
      e.currentTarget.play();
    } else {
      this.setState({paused: true});
      e.currentTarget.pause();
    }
  },

  handleSubmit: function(e) {
    console.log(this.state.comment);
  },

  _handleShowClick: function() {
    this.props.clickHandler(this.props.loop.id);
  },

  addLike: function(){
    var currentUser = this.state.user;

    if (currentUser.id) {
      var data = {loop_id: this.props.loop.id, liker_id: currentUser.id};
      ApiUtil.createLike(data, function() {
        this.setState({likes: (this.state.likes + 1), liked: true});
      }.bind(this));
    }

  },

  removeLike: function() {
    var likeId = this.searchForLike();
    ApiUtil.destroyLike(likeId, function() {
      this.setState({likes: (this.state.likes - 1), liked: false});
    }.bind(this));
  },



  render: function() {

    var muteIcon;
    if (this.state.muted === "muted") {
      muteIcon = "fa fa-volume-off volume";
    } else {
      muteIcon = "fa fa-volume-up volume";
    }


    var currentUser = this.state.user;

    var content = "";
    var repostIcon = (
      <p className="repost-icon"><i className="fa fa-refresh"></i></p>
    );

    var likeIcon;
    if (this.state.liked) {
      likeIcon = (
        <p className="like-icon liked" onClick={this.removeLike}><i className="fa fa-heart"></i></p>
      );
    } else {
      likeIcon = (
        <p className="like-icon" onClick={this.addLike}><i className="fa fa-heart"></i></p>
      );
    }



    if (this.props.loop.author_id === currentUser.id) {
      content = (
        <p className="delete-icon"><i className="fa fa-trash-o"></i></p>
      );
      repostIcon = "";
    } else {
      content = "";
      repostIcon = (
        <p className="repost-icon"><i className="fa fa-refresh"></i></p>
      );
    }

    var showLink = "#/loops/" + this.props.loop.id;
    var userLink = "#/users/" + this.props.loop.author_id;
    var createdAtDate = new Date(this.props.loop.created_at).toDateString();
    this.loopId = "loop"+this.props.loop.id;

    if (this.props.videoOnly) {
      return(
        <div className="loop">
          <i onClick={this.muteLogic} className={muteIcon} ></i>
          <video id={this.loopId} className="loop" onClick={this.pauseLogic} loop autoPlay muted={this.state.muted} src={this.props.loop.url}></video>
        </div>
      );
    } else {
      return(
        <div className="loop-box group">
          <div className="loop-info group">
            {content}
            <img className="profile-picture" src={this.props.loop.profile_picture} />
            <a className="author" href={userLink}>{this.props.loop.author}</a>
            <a className="created_at" href={showLink}>{createdAtDate}</a>
          </div>
          <i onClick={this.muteLogic} className={muteIcon} ></i>
          <video id={this.loopId}  className="loop" onClick={this.pauseLogic} loop autoPlay muted={this.state.muted} src={this.props.loop.url}></video>
          <div className="title">{this.props.loop.title}</div>
          <div className="loop-icons">
            {likeIcon}
            <i className="icon-number">{this.state.likes}</i>
            {repostIcon}
          </div>
          <form onSubmit={this.handleSubmit}>
            <input onChange={this.commentChange}
              className="comment-box" type="text"
              placeholder="Say Something Nice" value={this.state.comment}/>
          </form>
        </div>
      );
    }


  }
});

module.exports = Loop;
