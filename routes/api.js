const express = require('express');
const router = express.Router();
const Profile = require('../models/profile')
const PostItem = require('../models/postItem')
const Review = require('../models/review')



//get Posts
router.get("/post_item", async (request, response) => {
  console.log("getting post request")
  try {
      var pageSize = 1
      var pageNumber = parseInt(request.query.page_number);

      var pageNumber = pageSize*(pageNumber-1);

      console.log("page size"+pageSize,"page number"+pageNumber);
      var total = await PostItem.find().exec();
      var result = await PostItem.find().limit(pageSize).skip(pageNumber).exec();

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

//upload an image
router.post('/files', function(req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('images', function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
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

module.exports = router;