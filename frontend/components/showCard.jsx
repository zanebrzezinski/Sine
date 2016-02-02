var React = require('react');
var CurrentUserStore = require('../stores/current_user_store');
var SessionsApiUtil = require('../util/sessions_api_util');


var ShowCard = React.createClass({

  getInitialState: function() {
    var user;
    if (CurrentUserStore.userHasBeenFetched()) {
      user = CurrentUserStore.currentUser();
    } else {
      user = "";
    }

    return {comment: "", user: user};
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

  render: function() {
    var loop = this.props.loop;

    var showLink = "#/loops/" + loop.id;
    var userLink = "#/users/" + loop.author_id;
    var createdAtDate = new Date(loop.created_at).toDateString();

    var currentUser = CurrentUserStore.currentUser();

    var content = "";
    var repostIcon = (
      <a className="repost-icon" href="#"><i className="fa fa-refresh"></i></a>
    );

    if (this.props.loop.author_id === currentUser.id) {
      content = (
        <a href="#" className="delete-icon"><i className="fa fa-trash-o"></i></a>
      );
      repostIcon = "";
    } else {
      content = "";
      repostIcon = (
        <a className="repost-icon" href="#"><i className="fa fa-refresh"></i></a>
      );
    }


    return (
      <div className="show-card group">
        <div className="loop-info group">
          {content}
          <img className="profile-picture" src={this.props.loop.profile_picture} />
          <a className="author" href="">{this.props.loop.author}</a>
          <a className="created_at" href={showLink}>{createdAtDate}</a>
          <div className="title">{this.props.loop.title}</div>
        </div>
        <div className="loop-icons">
          <a className="like-icon" href="#"><i className="fa fa-heart"></i></a>
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
});

module.exports = ShowCard;
