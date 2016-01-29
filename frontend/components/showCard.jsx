var React = require('react');

var ShowCard = React.createClass({

  getInitialState: function() {
    return {comment: ""};
  },

  commentChange: function(e){
    this.setState({comment: e.currentTarget.value});
  },

  render: function() {
    var loop = this.props.loop;

    var showLink = "#/loops/" + loop.id;
    var userLink = "#/users/" + loop.author_id;
    var createdAtDate = new Date(loop.created_at).toDateString();


    return (
      <div className="show-card group">
        <div className="loop-info">
          <img className="profile-picture" src={this.props.loop.profile_picture} />
          <a className="author" href="">{this.props.loop.author}</a>
          <a className="created_at" href={showLink}>{createdAtDate}</a>
          <div className="title">{this.props.loop.title}</div>
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
