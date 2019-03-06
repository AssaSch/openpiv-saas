import React, {Component} from 'react';  
import axios from 'axios';
import src from '../assets/test_plot.jpg';

class fileUpload extends Component {

  state = {
    selectedFiles: null,
    result: null
  }

  fileSelectedHandler = (event) => {
    event.preventDefault();
    this.setState({
      selectedFiles: event.target.files
    }); 
  }

  fileUploadHandler = async (event) => {
    event.preventDefault();
    const fd = new FormData();
    fd.append('image_1', this.state.selectedFiles[0], this.state.selectedFiles[0].name);
    fd.append('image_2', this.state.selectedFiles[1], this.state.selectedFiles[1].name);
    const response = await axios.post('/api/upload', fd);
    this.setState({
      result: response
    });
  }

  render() {
    const file_path = this.state.result;
    return (
      <div className="fileUpload" >
        <input type="file" onChange={this.fileSelectedHandler} required multiple/>
        <button onClick={this.fileUploadHandler}> Upload </button>
        <br/>
        {file_path ? <img alt='' src={src} /> : null}
      </div>
    );
  }
}

export default fileUpload;
