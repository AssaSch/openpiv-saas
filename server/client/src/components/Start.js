import React, { Component, Fragment } from 'react';
import axios from 'axios';

class Start extends Component {
    // constructor(props) {
    //     super(props);
    
        // this.handleClick = this.handleClick.bind(this);
    // }

    handleClick = async () => {
        const response = await axios.post('/api/openpiv', "test data");
        console.log(response);
    }

    render() {
        return (
            <Fragment>
                <button onClick={this.handleClick}> 
                    Start
                </button>
            </Fragment>
        )
    }
}

export default Start;