var React = require('react');
var CurrentUserStore = require('../stores/current_user_store');
var SessionsApiUtil = require('../util/sessions_api_util');


var Loop = React.createClass({

  getInitialState: function(){
    var user;
    if (CurrentUserStore.userHasBeenFetched()) {
      user = CurrentUserStore.currentUser();
    } else {
      user = "";
    }

    return (
      {muted: "muted", paused: false, comment: null, user: user}
    );
  },

  componentDidMount: function() {
    this.token = CurrentUserStore.addListener(this._onChange);
    SessionsApiUtil.fetchCurrentUser();
  },

  _onChange: function() {
    this.setState({user: CurrentUserStore.currentUser()});
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



  render: function() {
    var icon;
    if (this.state.muted === "muted") {
      icon = "fa fa-volume-off volume";
    } else {
      icon = "fa fa-volume-up volume";
    }

    var content = "";

    var currentUser = CurrentUserStore.currentUser();

    if (this.props.loop.author_id === currentUser.id) {
      content = (
        <a href="#" className="delete-icon"><i className="fa fa-trash-o"></i></a>
      );
    } else {
      content = "";
    }

    var showLink = "#/loops/" + this.props.loop.id;
    var userLink = "#/users/" + this.props.loop.author_id;
    var createdAtDate = new Date(this.props.loop.created_at).toDateString();
    this.loopId = "loop"+this.props.loop.id;

    if (this.props.videoOnly) {
      return(
        <div className="loop">
          <i onClick={this.muteLogic} className={icon} ></i>
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
          <i onClick={this.muteLogic} className={icon} ></i>
          <video id={this.loopId}  className="loop" onClick={this.pauseLogic} loop autoPlay muted={this.state.muted} src={this.props.loop.url}></video>
          <div className="title">{this.props.loop.title}</div>
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
