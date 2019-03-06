const express = require('express');
const router = express.Router();
const request = require('request-promise');


router.post('/', async (req, res) => {
    console.log("test openpiv");
    const options = {
        method: 'POST',
        uri: 'http://localhost:4000/openpiv',
        body: {
            some: 'payload'
        },
        json: true // Automatically stringifies the body to JSON
    };

    const response = await request(options);
    console.log(JSON.stringify(response));
    res.status(200).send(response);
    // Consider using python-shell module
    // const { spawn } = require('child_process');
    // const pyProg = spawn('python', ['../openpiv/openpiv-python/openpiv/examples/scripts/example_image_pair.py']);

    // pyProg.stdout.on('data', function(data) {

    //     console.log(data.toString());
    //     res.status(200).send(data);
    // });

    // pyProg.stderr.on('data', function(data) {

    //     console.log(data.toString());
        
    //     res.status(500).send(data);
    // });
});

module.exports = router;