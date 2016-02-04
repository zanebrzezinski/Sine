var React = require('react');
var ApiUtil = require('../util/api_util');

var CommentShow = require('./comment_show');

var Comments = React.createClass({

  getInitialState: function() {
    return(
      {comment: "", commentShow: false, page: 1}
    );
  },

  commentChange: function(e) {
    this.setState({comment: e.currentTarget.value});
  },

  showComments: function() {
    this.setState({commentShow: true});
  },

  handleSubmit: function(e){
    e.preventDefault();
    ApiUtil.createComment(
      {comment: this.state.comment,
      loop_id: this.props.loopId, user_id: this.props.currentUser.id},
      this.state.page,
      function(){
        this.setState({comment: "", commentShow: true});
      }.bind(this));
  },

  render: function(){

    var commentCount = this.props.comments.array.length;

    if (this.state.commentShow) {
      commentShow = < CommentShow comments={this.props.comments} />;
    } else {
      commentShow = "";
    }

    return(
      <div>
        {commentShow}
        <p className="comment-count" onClick={this.showComments}>{commentCount} Comments</p>
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
