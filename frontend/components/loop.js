var ApiUtil = require('../util/api_util');

var Comments = require('./comments');


var Loop = React.createClass({displayName: "Loop",

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
    if (currentUser.id && !this.saving) {
      this.saving = true;
      var data = {loop_id: this.props.loop.id, liker_id: currentUser.id};
      ApiUtil.createLike(data, function() {
        this.setState({likes: (this.state.likes + 1), liked: true});
        this.saving = false;
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
        React.createElement("p", {className: "like-icon liked", onClick: this.removeLike}, React.createElement("i", {className: "fa fa-heart"}))
      );
    } else {
      likeIcon = (
        React.createElement("p", {className: "like-icon", onClick: this.addLike}, React.createElement("i", {className: "fa fa-heart"}))
      );
    }
    var followContent;


    if (this.props.user.id) {
      if (this.state.following) {
        followContent = (
          React.createElement("p", {className: "follow-icon following", onClick: this.removeFollowing}, React.createElement("i", {className: "fa fa-user"}))
        );
      } else {
        followContent = (
          React.createElement("p", {className: "follow-icon", onClick: this.addFollowing}, React.createElement("i", {className: "fa fa-user"}))
        );
      }
    }



    var repostIcon = (
      ""
      // <p className="repost-icon"><i className="fa fa-refresh"></i></p>
    );

    if (this.props.loop.author_id === this.props.user.id) {
      content = (
        React.createElement("p", {className: "delete-icon", onClick: this.deletePost}, React.createElement("i", {className: "fa fa-trash-o"}))
      );
      repostIcon = "";
    } else {
      content = followContent;
      repostIcon = (
        ""
        // <p className="repost-icon"><i className="fa fa-refresh"></i></p>
      );
    }

    var showLink = "#/loops/" + this.props.loop.id;
    var userLink = "#/users/" + this.props.loop.author_id;
    var createdAtDate = new Date(this.props.loop.created_at).toDateString();
    this.loopId = "loop"+this.props.loop.id;

    var tags = this.props.loop.tags.array.map(function(tag){
      return(
        React.createElement("a", {key: tag.id, href: "#/tag/" + tag.id, className: "tag"}, tag.tag, " ")
      );
    });


    return(
      React.createElement("div", {className: "loop-box group"}, 
        React.createElement("div", {className: "loop-info group"}, 
          content, 
          React.createElement("a", {className: "author", href: userLink}, 
            React.createElement("img", {className: "profile-picture", src: this.props.loop.profile_picture}), 
            this.props.loop.author
          ), 
          React.createElement("a", {className: "created_at", href: showLink}, createdAtDate)
        ), 
        React.createElement("i", {onClick: this.muteLogic, className: muteIcon}), 
        React.createElement("video", {id: this.loopId, className: "loop", onClick: this.pauseLogic, loop: true, autoPlay: true, muted: this.state.muted, src: this.props.loop.url}), 
        React.createElement("div", {className: "title"}, this.props.loop.title), 
        React.createElement("div", {className: "tags"}, tags), 
        React.createElement("div", {className: "loop-icons"}, 
          likeIcon, 
          React.createElement("i", {className: "icon-number"}, this.state.likes), 
          repostIcon
        ), 
        React.createElement(Comments, {comments: this.props.loop.comments, 
         loopId: this.props.loop.id, currentUser: this.props.user})
      )
    );
  }
});

module.exports = Loop;