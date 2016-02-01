var React = require('react');
var Loop = require('./loop.jsx');

var VideoUpload = React.createClass({

  getInitialState: function() {
    return(
      {loop: null, loopUrl: "http://mirrors.creativecommons.org/movingimages/webm/CCBrasil_240p.webm"}
    );
  },

  render: function() {
    return (
      <div>
        <div  className='modal-cover' onClick={this.props.handleClick} />
        <div className="modal video-upload">

          <h2>Upload</h2>
            <video className="upload-preview" loop controls autoPlay muted src={this.state.loopUrl}></video>

            <form className="userform group" onSubmit={this.submit}>
                <input className="file-upload" type="file" onChange={this.changeFile}/>
            </form>

        </div>
      </div>
    );
  }


});

module.exports = VideoUpload;
