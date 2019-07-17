import React, { Component } from 'react';
import axios from 'axios';
import fileDownload from 'js-file-download';

class fileUpload extends Component {

  state = {
    selectedFiles: null,
    result: null,
    image1: null,
    image2: null,
  }

  fileSelectedHandler = (event) => {
    // if (this.state.selectedFiles !== event.target.files) {
    //   this.setState({
    //     selectedFiles: event.target.files
    //   }); 
    // }
    if (event.target.files.length !== 2) {
      console.log('Must select exactly two files');
      return;
    }
    const reader1 = new FileReader();
    reader1.onloadend = (e) => {
      const base64result = e.target.result.split(',')[1];
      this.setState({
        image1: base64result
      });
    }
    reader1.readAsDataURL(event.target.files[0]);

    const reader2 = new FileReader();
    reader2.onloadend = (e) => {
      const base64result = e.target.result.split(',')[1];
      this.setState({
        image2: base64result
      });
    }
    reader2.readAsDataURL(event.target.files[1]);
  }

  fileUploadHandler = async (event) => {
    // if (this.state.selectedFiles[0]) {
    //   const reader1  = new FileReader();
    //   reader1.onloadend = (e) => {
    //     const base64result = e.target.result.split(',')[1];
    //     this.setState({
    //       image1: base64result
    //     });
    //   }
    //   reader1.readAsDataURL(this.state.selectedFiles[0]);
    // }

    // if (this.state.selectedFiles[1]) {
    //   const reader2  = new FileReader();
    //   reader2.onloadend = (e) => {
    //     const base64result = e.target.result.split(',')[1];
    //     this.setState({
    //       image2: base64result
    //     });
    //   }
    //   reader2.readAsDataURL(this.state.selectedFiles[1]);
    // }
    const { image1, image2 } = this.state;
    if (image1 && image2) {
      const body = {
        image1,
        image2
      };
      // const response = await axios.post(`localhost:4000/api/openpiv`, body);
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}:4000/api/openpiv`, body);
      const result = window.atob(response.data);
      fileDownload(result, 'result.txt');
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    // const { image1, image2 } = this.state; 
    // if (image1 && image2 !== prevState.image2) {
    //   const body = {
    //     image1: this.state.image1,
    //     image2: this.state.image2
    //   };
    //   const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}:4000/api/openpiv`, body);
    //   const result = window.atob(response.data);
    //   fileDownload(result, 'result.txt');
    // }
  }

  render() {
    console.log(this.state);
    const { image1, image2 } = this.state;
    return (
      <div className="fileUpload" >
        <input type="file" onChange={this.fileSelectedHandler} required multiple />
        <button onClick={this.fileUploadHandler}> Upload </button>
        <br />
        {/* <img src={"data:image/png;base64," +  image1} />} */}
        <div style={{ padding: "20x" }}>
          {image1 && <img alt='img1' src={"data:image/png;base64," + image1} />}
        </div>
        <div>
          {image2 && <img alt='img2' src={"data:image/png;base64," + image2} />}
        </div>
      </div>
    );
  }
}

export default fileUpload;
