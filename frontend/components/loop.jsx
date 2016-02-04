var React = require('react');
var ApiUtil = require('../util/api_util');

var Comments = require('./comments');


var Loop = React.createClass({

  getInitialState: function(){

    return (
      {muted: "muted", paused: false, comment: null,
        likes: this.props.loop.likes.array.length, liked: false, following: false}
    );
  },

  componentDidMount: function() {
    this.searchForLike();
    this.searchForFollowing();
  },

  searchForFollowing: function() {
    var followingId;

    this.props.loop.author_followers.array.forEach (function(follower){
      if (this.props.user.id === follower.follower) {
        this.setState({following: true});
        followingId = follower.id;
        return;
      }
      this.setState({following: false});
    }.bind(this));
    return followingId;
  },

  searchForLike: function(){
    var likeId;
    this.props.loop.likes.array.forEach (function(like){
      if (this.props.user.id === like.liker_id) {
        this.setState({liked: true});
        likeId = like.id;
        return;
      }
      this.setState({liked: false});
    }.bind(this));
    return likeId;
  },

  componentWillReceiveProps: function() {
    this.searchForLike();
    this.searchForFollowing();
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
    var currentUser = this.props.user;

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

  addFollowing: function(){
    var currentUser = this.props.user;
    if (currentUser.id) {
      var data = {follower_id: currentUser.id, followee_id: this.props.loop.author_id};
      ApiUtil.createFollowing(data, function(){
        this.setState({following: true});
      }.bind(this));
    }
  },

  removeFollowing: function(){
    var followingId = this.searchForFollowing();
    ApiUtil.destroyFollowing(followingId, function() {
      this.setState({following: false});
    }.bind(this));
  },

  deletePost: function(){
    ApiUtil.destroyLoop(this.props.loop.id, function(){
    }.bind(this));
  },

  render: function() {

    var muteIcon;
    if (this.state.muted === "muted") {
      muteIcon = "fa fa-volume-off volume";
    } else {
      muteIcon = "fa fa-volume-up volume";
    }


    var currentUser = this.props.user;


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
    var followContent;

    if (this.state.following) {
      followContent = (
        <p className="follow-icon following" onClick={this.removeFollowing}><i className="fa fa-user"></i></p>
      );
    } else {
      followContent = (
        <p className="follow-icon" onClick={this.addFollowing}><i className="fa fa-user"></i></p>
      );
    }



    var repostIcon = (
      <p className="repost-icon"><i className="fa fa-refresh"></i></p>
    );

    if (this.props.loop.author_id === this.props.user.id) {
      content = (
        <p className="delete-icon" onClick={this.deletePost}><i className="fa fa-trash-o"></i></p>
      );
      repostIcon = "";
    } else {
      content = followContent;
      repostIcon = (
        <p className="repost-icon"><i className="fa fa-refresh"></i></p>
      );
    }

    var showLink = "#/loops/" + this.props.loop.id;
    var userLink = "#/users/" + this.props.loop.author_id;
    var createdAtDate = new Date(this.props.loop.created_at).toDateString();
    this.loopId = "loop"+this.props.loop.id;

    var tags = this.props.loop.tags.array.map(function(tag){
      return(
        <a key={tag.id} href={"#/tag/" + tag.id} className="tag">{tag.tag} </a>
      );
    });


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
        <div className="tags">{tags}</div>
        <div className="loop-icons">
          {likeIcon}
          <i className="icon-number">{this.state.likes}</i>
          {repostIcon}
        </div>
        < Comments comments={this.props.loop.comments}
         loopId={this.props.loop.id} currentUser={this.props.user}/>
      </div>
    );
  }
});

module.exports = Loop;
