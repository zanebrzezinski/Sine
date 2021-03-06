var React = require('react');

var CommentShow = React.createClass({

  render: function() {
    var comments = this.props.comments.map(function(comment){
      return(
        <li key={comment.id} className="comment">
          <img className="comment-profile-picture" src={comment.profile_picture}/>
          <a className="comment-user-name" href={"/#/users/" + comment.user_id}>{comment.user}</a>
          <p className="comment-body">{comment.comment}</p>
        </li>
      );
    });

    return(
      <ul className="comments-list">
        {comments}
      </ul>
    );
  }

});

module.exports= CommentShow;
