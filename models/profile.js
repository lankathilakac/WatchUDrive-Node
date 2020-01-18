const mongoose = require('mongoose');
const schema = mongoose.Schema;

const profileSchema = new schema({
    name:{
        type:String,
        required:[true,"Name is Required"]
    },
    rank:{
         type:String
    },
    image_url:{
        type:String
    },
    type:{
        type:String
    }

});

const Profile = mongoose.model('profile',profileSchema);

module.exports = Profile;