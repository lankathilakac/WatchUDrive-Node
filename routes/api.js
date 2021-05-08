const express = require('express');
const router = express.Router();
const Profile = require('../models/profile')
const PostItem = require('../models/postItem')
const Review = require('../models/review')
var multer  = require('multer')
var fs = require('fs');

var upload = multer({ dest: 'uploads/' })


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
var upload = multer({ storage: storage })


//get Posts
router.get("/post_item", async (request, response) => {
  console.log("getting post request")
  try {
      var result
      var pageSize = 1
      var pageNumber = parseInt(request.query.page_number);

      var pageNumber = pageSize*(pageNumber-1);

      console.log("page size"+pageSize,"page number"+pageNumber);
      var total = await PostItem.find().exec();
      if(pageNumber==0){
         result = await PostItem.find().limit(pageSize).skip(pageNumber).exec();
      }
      else{
        result = await PostItem.find().limit(pageSize).sort({_id:-1}).skip(pageNumber).exec();
      }
      

      var responseFull = ({
        "page": pageNumber,
        "per_page": pageSize,
        "total": total.length,
        "total_pages": total/pageSize,
        "data":result
      });

      response.json(responseFull);
  } catch (error) {
      response.status(500).send(error);
      console.log("an error occurd at Post-item")
  }
});

//save new post item
router.post('/feed_item',async function(req,res){
  console.log("getting postitem resuest")
  try {
    var postItem = new PostItem(req.body);
    var result = await postItem.save();
    res.json(result);
  } catch (error) {
  }
});



//save new review
router.post('/review',async function(req,res){
  console.log("getting review resuest")
  try {
    var review = new Review(req.body);
    var result = await review.save();
    res.json(result);
  } catch (error) {
  }
});

//get profile
router.get('/profile',async function(req,res){
  console.log("getting") 
 try {
   var result = await Profile.find().exec();
   res.json(result);
 } catch (error) {//
   res.status(500).send(error);
 }
 });

//save new profile
router.post('/profile',async function(req,res){
    try {
      var person = new Profile(req.body);
      var result = await person.save();
      res.json(result);
    } catch (error) {
      
    }
});



//update a profile
router.put('/profile/:id',function(req,res,next){
Profile.findByIdAndUpdate({_id:req.params.id}, req.body).then(function(){
Profile.findOne({_id:req.params.id}).then(function(profile){
res.send(profile);
});
});
});

//delete a profile
router.delete('/profile/:id',function(req,res,next){
Profile.findByIdAndRemove({_id:req.params.id}).then(function(profile){
    res.send(profile);
});
});

router.post('/upload', upload.single('image'), (req, res, next) => {
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  var imageBuffer = new Buffer.from(req.body.file, 'base64');

  fs.writeFile('/uploads/myfile.jpg', imageBuffer , function (err) {
    if (err) return next(err)

  })

    res.send(file)

  
});


module.exports = router;