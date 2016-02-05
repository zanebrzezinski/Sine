var React = require('react');
var Loop = require('./loop.jsx');
var ApiUtil = require('../util/api_util');
var History = require('react-router').History;

var VideoUpload = React.createClass({
  mixins: [History],

  getInitialState: function() {
    return(
      {title: "", loop: null, loopUrl: "", tags: "", buttonClass: "form-button"}
    );
  },

  componentDidMount: function(){
    this.setLoop();
  },

  _onChange: function() {
    this.setState({user: CurrentUserStore.currentUser()});
  },

  changeTitle: function(e){
    this.setState({title: e.currentTarget.value});
  },

  changeTags: function(e){
    this.setState({tags: e.currentTarget.value});
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
      reader.readAsDataURL(file);
    } else {
      this.setState({loop: null, loopUrl: ""});
    }
  },

  handleSubmit: function(e) {
    e.preventDefault();

    this.setState({buttonClass: "hidden"});

    var formData = new FormData();

    formData.append("loop[title]", this.state.title);
    if (this.state.loop) {
      formData.append("loop[loop_video]", this.state.loop);
    }

    ApiUtil.createLoop(formData, function(loop){
      ApiUtil.createTaggings({tags: this.state.tags, loop_id: loop.id});
      this.props.handleClick();
      this.history.pushState({}, "loops/" + loop.id);
    }.bind(this));
  },



  render: function() {
    var content = "";
    if (this.state.buttonClass === "hidden") {
      content = <p className="form-button upload">Please Wait... Processing your loop</p>;
    }

    return (
      <div>
        <div  className='modal-cover' onClick={this.props.handleClick} />
        <div className="modal video-upload">

          <h2>Upload</h2>
            <video className="upload-preview" loop autoPlay muted src={this.state.loopUrl}></video>

            <form className="userform group" onSubmit={this.handleSubmit}>
                <input className="file-upload" type="file" onChange={this.changeFile}/>
                  <input className="textbox" onChange={this.changeTitle} placeholder="Title" type="text" name="title" value={this.state.title}/>
                  <input className="textbox" onChange={this.changeTags} placeholder="Enter Tags" type="text" name="tags" value={this.state.tags}/>
                <button className={this.state.buttonClass}>Create Loop</button>
                {content}
            </form>

        </div>
      </div>
    );
  }


});

module.exports = VideoUpload;
