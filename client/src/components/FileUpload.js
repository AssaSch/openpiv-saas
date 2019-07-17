import React, { Component } from 'react';
import axios from 'axios';
import fileDownload from 'js-file-download';

class fileUpload extends Component {

  state = {
    image1: '',
    image2: '',
    formFields: {
      searchSize: '',
      winSize: '',
      overlap: '',
      dt: '',
    }
  }

  componentDidMount() {

  }

  fileSelectedHandler = (event) => {
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

  handleSubmit = (event) => {
    console.log(this.state);
    const { image1, image2, formFields: { searchSize, winSize, overlap, dt } } = this.state;
    if (image1 && image2) {
      const body = {
        image1,
        image2,
        searchSize,
        winSize,
        overlap,
        dt
      };
      axios.post(`${process.env.REACT_APP_SERVER_URL}:4000/api/openpiv`, body)
      .then((response) => {
        const result = window.atob(response.data);
        fileDownload(result, 'result.txt');
      });
    }
    event.preventDefault();
  }

  inputChangeHandler = (e) => {
    let formFields = {...this.state.formFields};
    formFields[e.target.name] = e.target.value;
    this.setState({
     formFields
    });
   }

  render() {
    console.log(this.state);
    const { image1, image2 } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Files:
          <input type="file" onChange={this.fileSelectedHandler} required multiple />
        </label>
        <label>
          search area size:
          <input type="number" name="searchSize" value={this.state.searchSize} onChange={this.inputChangeHandler} />
        </label>
        <label>
          window size size:
          <input type="number" name="winSize" value={this.state.winSize} onChange={this.inputChangeHandler} />
        </label>
        <label>
          overlap:
          <input type="number" name="overlap" value={this.state.overlap} onChange={this.inputChangeHandler} />
        </label>
        <label>
          dt:
          <input type="number" name="dt" value={this.state.dt} onChange={this.inputChangeHandler} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      // {image1 && <img alt='img1' src={"data:image/png;base64," + image1} />}
    );
  }
}

export default fileUpload;
