var React = require('react');

var Loop = React.createClass({

  getInitialState: function(){
    return (
      {muted: true, date_created: new Date(this.props.loop.created_at), comment: null}
    );
  },

  commentChange: function(e){
    this.setState({comment: e.currentTarget.value});
  },

  render: function() {
    return(
      <div className="loop-box">
        <div className="loop-info">
          <div className="author">{this.props.loop.author}</div>
          <div className="created_at">{this.state.date_created.toDateString()}</div>
        </div>
        <video className="loop" loop controls autoPlay muted src={this.props.loop.url}/>
        <div className="title">{this.props.loop.title}</div>
        <input onChange={this.commentChange} className="comment-box" type="text" placeholder="Say Something Nice" value={this.state.comment}/>
      </div>
    );
  }
});

module.exports = Loop;
