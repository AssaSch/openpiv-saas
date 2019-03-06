import React, {Component} from 'react';  

// import Start from '../components/Start';
import FileUpload from '../components/FileUpload';


class Landing extends Component {  

    render() {
        return (
            <div>
                <FileUpload/>
                {/* <Start/> */}
            </div>
        );
    }
};

export default Landing;