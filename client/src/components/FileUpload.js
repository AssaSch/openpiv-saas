import React, { Component } from 'react';
import axios from 'axios';
import fileDownload from 'js-file-download';
import { Card } from 'antd';

const { Meta } = Card;

class fileUpload extends Component {

  state = {
    image1: '',
    image2: '',
    resultImage: '',
    formFields: {
      searchSize: '',
      winSize: '',
      overlap: '',
      dt: '',
    }
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
      axios.post(`${process.env.REACT_APP_SERVER_URL}:443/api/openpiv`, body)
      .then((response) => {
        const result_text = window.atob(response.data.text_data);
        this.setState({
          resultImage: response.data.image_data
        });
        fileDownload(result_text, 'result.txt');
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
    const { image1, image2, resultImage } = this.state;
    return (
      <>
      <form className='fileUpload_main_form' onSubmit={this.handleSubmit}>
        <label>
          Please upload two images:
          <input type="file" onChange={this.fileSelectedHandler} required multiple />
        </label>
        <label>
          Search area size (in pixels):
          <input type="number" className='fileUpload_input' name="searchSize" value={this.state.searchSize} onChange={this.inputChangeHandler} />
        </label>
        <label>
          Window size size (in pixels):
          <input type="number" className='fileUpload_input' name="winSize" value={this.state.winSize} onChange={this.inputChangeHandler} />
        </label>
        <label>
          Overlap (in pixels):
          <input type="number" className='fileUpload_input' name="overlap" value={this.state.overlap} onChange={this.inputChangeHandler} />
        </label>
        <label>
          Time between two images (in seconds):
          <input type="number" className='fileUpload_input' step="0.01" name="dt" value={this.state.dt} onChange={this.inputChangeHandler} />
        </label>
        <input className='fileUpload_submit' type="submit" value="Submit" />
      </form>
      <div className='fileUpload_cards'> {image1 && <Card
        hoverable
        style={{ width: 400 }}
        cover={<img alt="image_1" src={"data:image/png;base64," + image1} />}
      >
        <Meta title="image 1 preview" />
      </Card>}
      {image2 && <Card
        hoverable
        style={{ width: 400 }}
        cover={<img alt="image_2" src={"data:image/png;base64," + image2} />}
      >
        <Meta title="image 2 preview" />
      </Card>}
      </div>
      <div>
        {resultImage && <Card
          hoverable
          style={{ width: 800 }}
          cover={<img alt="result_image" src={"data:image/png;base64," + resultImage} />}
        >
          <Meta title="result" />
        </Card>}
      </div>
    </>
    );
  }
}

export default fileUpload;
