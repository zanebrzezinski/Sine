var React = require('react');

var Comments = React.createClass({

  getInitialState: function() {
    return(
      {comment: ""}
    );
  },

  commentChange: function(e) {
    this.setState({comment: e.currentTarget.value});
  },

  render: function(){
    return(
      <div>
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
