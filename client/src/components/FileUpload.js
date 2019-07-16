import React, {Component} from 'react';  
import axios from 'axios';
import fileDownload from 'js-file-download';

class fileUpload extends Component {

  state = {
    selectedFiles: null,
    result: null
  }

  fileSelectedHandler = (event) => {
    if (this.state.selectedFiles !== event.target.files) {
      this.setState({
        selectedFiles: event.target.files
      }); 
    }
  }

  fileUploadHandler = async (event) => {
    if (this.state.selectedFiles[0]) {
      const reader1  = new FileReader();
      reader1.onloadend = (e) => {
        const base64result = e.target.result.split(',')[1];
        this.setState({
          image1: base64result
        });
      }
      reader1.readAsDataURL(this.state.selectedFiles[0]);
    }

    if (this.state.selectedFiles[1]) {
      const reader2  = new FileReader();
      reader2.onloadend = (e) => {
        const base64result = e.target.result.split(',')[1];
        this.setState({
          image2: base64result
        });
      }
      reader2.readAsDataURL(this.state.selectedFiles[1]);
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    const { image1, image2 } = this.state; 
    if (image1 && image2 !== prevState.image2) {
      const body = {
        image1: this.state.image1,
        image2: this.state.image2
      };
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/openpiv`, body);
      const result = window.atob(response.data);
      fileDownload(result, 'result.txt');
    }
  }

  render() {
    return (
      <div className="fileUpload" >
        <input type="file" onChange={this.fileSelectedHandler} required multiple/>
        <button onClick={this.fileUploadHandler}> Upload </button>
        <br/>
      </div>
    );
  }
}

export default fileUpload;
