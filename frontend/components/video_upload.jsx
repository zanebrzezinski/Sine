var React = require('react');

var VideoUpload = React.createClass({

  render: function() {
    return (
      <div>
        <div  className='modal-cover' onClick={this.props.handleClick} />
        <div className="modal video-upload">

          <h2>Upload</h2>

            <form className="userform group" onSubmit={this.submit}>
                <input className="file-upload" type="file" onChange={this.changeFile}/>
            </form>

        </div>
      </div>
    );
  }


});

module.exports = VideoUpload;
