const express = require('express');
const router = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');



const app = express();


console.log(__dirname);

mongoose.connect('mongodb://localhost/watchUDrive');
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api',router);
app.use(fileUpload({
    createParentPath: true
}));

//app.use('/image', express.static(__dirname +'/images'));
app.use('/watchUDrive', express.static(__dirname +'/WatchUDriveUserFiles'));

app.use(function(err,req,res,next){
console.log(err);
res.status(422).send({error:"profile validation failed"});
});
app.listen(4000,function(){
console.log('now listing');
});
