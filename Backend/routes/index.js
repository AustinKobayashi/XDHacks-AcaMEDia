var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser'); //connects bodyParsing middleware
var formidable = require('formidable');
var path = require('path');     //used for file path
var fs =require('fs-extra');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.post('/', function(req, res, next) {
//
//     var form = new formidable.IncomingForm();
//         //Formidable uploads to operating systems tmp dir by default
//         form.uploadDir = "./files";       //set upload directory
//         form.keepExtensions = true;     //keep file extension
//
//         form.parse(req, function(err, fields, files) {
//             res.writeHead(200, {'content-type': 'text/plain'});
//             res.write('received upload:\n\n');
//             console.log("form.bytesReceived");
//             //TESTING
//             console.log("file size: "+JSON.stringify(files.fileupload.size));
//             console.log("file path: "+JSON.stringify(files.fileupload.path));
//             console.log("file name: "+JSON.stringify(files.fileupload.name));
//             console.log("file type: "+JSON.stringify(files.fileupload.type));
//             console.log("astModifiedDate: "+JSON.stringify(files.fileupload.lastModifiedDate));
//
//             //Formidable changes the name of the uploaded file
//             //Rename the file to its original name
//             fs.rename(files.fileupload.path, './files/'+files.fileupload.name, function(err) {
//                 if (err)
//                     throw err;
//                 console.log('renamed complete');
//             });
//             res.end();
//         });
// });

module.exports = router;
