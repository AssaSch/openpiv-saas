const express = require('express');
const router = express.Router();
const path = require("path");
const multer = require("multer");
const request = require('request-promise');
const fs = require('fs');


// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('myImage');

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}

router.post('/', async (req, res) => {
  upload(req, res, async (err) => {
    if(err){
      res.status(500).send({msg: err});
    } else {
      if(req.files == undefined){
        res.send({
          msg: 'Error: No File Selected!'
        });
      } else {
      
        const options = {
          method: 'POST',
          uri: 'http://localhost:4000/openpiv',
          body: {
              image_1: req.files.image_1.data,
              image_2: req.files.image_2.data
          },
          
          json: true // Automatically stringifies the body to JSON
      };
  
      const response = await request(options);
      const file_data = fs.readFileSync('../openpiv/api-server/src/test_plot.jpg');
      fs.unlinkSync("./client/src/assets/test_plot.jpg");
      fs.writeFileSync("./client/src/assets/test_plot.jpg", file_data);
      res.status(200).send(response);
      }
    }
  });
});


module.exports = router;