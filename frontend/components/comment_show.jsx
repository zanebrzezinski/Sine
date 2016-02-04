var React = require('react');

var CommentShow = React.createClass({

  render: function() {
    var comments = this.props.comments.array.map(function(comment){
      return(
        <li key={comment.id} className="comment">
          <a className="comment-user-name" href={"/#/users/" + comment.user_id}>{comment.user}</a>
          <p className="comment-body">{comment.comment}</p>
        </li>
      );
    });

    return(
      <ul>
        {comments}
      </ul>
    );
  }

});

module.exports= CommentShow;
