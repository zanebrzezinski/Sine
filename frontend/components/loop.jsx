var React = require('react');

var Loop = React.createClass({

  getInitialState: function(){
    return (
      {muted: "muted", date_created: new Date(this.props.loop.created_at), comment: null}
    );
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

  render: function() {
    var icon;
    if (this.state.muted === "muted") {
      icon = "fa fa-volume-off volume";
    } else {
      icon = "fa fa-volume-up volume";
    }

    return(
      <div className="loop-box">
        <div className="loop-info">
          <div className="author">{this.props.loop.author}</div>
          <div className="created_at">{this.state.date_created.toDateString()}</div>
        </div>
        <i className={icon} ></i>
        <video onClick={this.muteLogic} className="loop" loop autoPlay muted={this.state.muted} src={this.props.loop.url}></video>
        <div className="title">{this.props.loop.title}</div>
        <input onChange={this.commentChange} className="comment-box" type="text" placeholder="Say Something Nice" value={this.state.comment}/>
      </div>
    );
  }
});

module.exports = Loop;
