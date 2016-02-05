var React = require('react');
var ApiUtil = require('../util/api_util');

var CommentShow = require('./comment_show');

var Comments = React.createClass({

  getInitialState: function() {
    return(
      {comment: "", commentShow: false, numComments: 3}
    );
  },

  commentChange: function(e) {
    this.setState({comment: e.currentTarget.value});
  },

  showComments: function() {
    var commentLength = this.props.comments.array.length;
    if (this.state.commentShow) {
      if (this.state.numComments + 3 > commentLength) {
        this.setState({numComments: commentLength});
      } else {
        this.setState({numComments: this.state.numComments + 3});
      }
    } else{
      this.setState({commentShow: true});
    }
  },

  handleSubmit: function(e){
    e.preventDefault();
    ApiUtil.createComment(
      {comment: this.state.comment,
      loop_id: this.props.loopId, user_id: this.props.currentUser.id},
      function(){
        this.setState({comment: ""});
        this.showComments();
      }.bind(this)
    );
  },

  render: function(){
    var commentCount = this.props.comments.array.length;

    if (this.state.commentShow) {
      commentShow = (
        < CommentShow
        comments={this.props.comments.array.slice(commentCount - this.state.numComments)} />
    );
    } else {
      commentShow = "";
    }

    return(
      <div>
        <p className="comment-count" onClick={this.showComments}>{commentCount} Comments</p>
        {commentShow}
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.commentChange}
            className="comment-box" type="text"
            placeholder="Say Something Nice" value={this.state.comment}/>
        </form>
      </div>
    );
  }

});

module.exports = Comments;
