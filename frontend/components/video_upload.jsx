var React = require('react');
var Loop = require('./loop.jsx');
var ApiUtil = require('../util/api_util');

var VideoUpload = React.createClass({

  getInitialState: function() {
    return(
      {title: "", loop: null, loopUrl: ""}
    );
  },

  componentDidMount: function(){
    this.setLoop();
  },

  changeTitle: function(e){
    this.setState({title: e.currentTarget.value});
  },

  setLoop: function() {

    this.video = document.getElementsByClassName("upload-preview")[0];

    this.loopCallBack = function(){
      if (this.video.currentTime >= 7) {
        this.video.currentTime = 0;
      }
    }.bind(this);

    this.video.addEventListener("timeupdate", this.loopCallBack);

  },

  compontDidUnmount: function(){
    this.video.removeEventListener("timeupdate", this.loopCallBack);
  },

  changeFile: function(e) {
    var reader = new FileReader();
    var file = e.currentTarget.files[0];

    reader.onloadend = function () {
      this.setState({loop: file, loopUrl: reader.result});
    }.bind(this);

    if (file) {
      reader.readAsDataURL(file); // will trigger a load end event when it completes, and invoke reader.onloadend
    } else {
      this.setState({loop: null, loopUrl: ""});
    }
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var formData = new FormData();

    formData.append("loop[title]", this.state.title);
    if (this.state.loop) {
      formData.append("loop[loop_video]", this.state.loop);
    }

    ApiUtil.createLoop(formData, function(){
      this.props.handleClick();
    }.bind(this));
  },



  render: function() {
    return (
      <div>
        <div  className='modal-cover' onClick={this.props.handleClick} />
        <div className="modal video-upload">

          <h2>Upload</h2>
            <video className="upload-preview" loop controls autoPlay muted src={this.state.loopUrl}></video>

            <form className="userform group" onSubmit={this.handleSubmit}>
                <input className="file-upload" type="file" onChange={this.changeFile}/>
                  <input className="textbox" onChange={this.changeTitle} placeholder="Title" type="text" name="title" value={this.state.title}/>
                <button className="form-button">Create Loop</button>
            </form>

        </div>
      </div>
    );
  }


});

module.exports = VideoUpload;