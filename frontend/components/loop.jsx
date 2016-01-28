var React = require('react');

var Loop = React.createClass({

  getInitialState: function(){
    var loop = this.props.loop;
    var className;
    debugger
    if (loop) {
      className = "loop-box";
    }

    return (
      {muted: "muted", paused: false,
      date_created: new Date(loop.created_at),
      comment: null, loop: loop, className: className}
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

  // pause/unpause seems to cause problems in HTML5 video :( so this only
  // sorta works. to be implemented where "onClick={this.mutelogic} is."
  pauseLogic: function(e){
    // if (this.state.paused) {
    //   this.setState({paused: false});
    //   e.currentTarget.play();
    // } else {
    //   this.setState({paused: true});
    //   e.currentTarget.pause();
    // }
  },

  handleSubmit: function(e) {
    console.log(this.state.comment);
  },

  _handleShowClick: function() {
    this.props.clickHandler(this.state.loop.id);
  },



  render: function() {
    var icon;
    if (this.state.muted === "muted") {
      icon = "fa fa-volume-off volume";
    } else {
      icon = "fa fa-volume-up volume";
    }

    var showLink = "#/loops/" + this.state.loop.id;

    return(
      <div className={this.state.className}>
        <div className="loop-info">
          <div className="author">{this.state.loop.author}</div>
          <a className="created_at" href={showLink}>{this.state.date_created.toDateString()}</a>
        </div>
        <i onClick={this.muteLogic} className={icon} ></i>
        <video className="loop" loop autoPlay muted={this.state.muted} src={this.state.loop.url}></video>
        <div className="title">{this.state.loop.title}</div>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.commentChange}
            className="comment-box" type="text"
            placeholder="Say Something Nice" value={this.state.comment}/>
        </form>
      </div>
    );
  }
});

module.exports = Loop;
