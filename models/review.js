const mongoose = require('mongoose');
const schema = mongoose.Schema;

const reviewSchema = new schema({
    
    post_id: {
        type: String
    },
    licsence_plate: {
        type: String
    },
    violation_type: {
        type: String
    },
    reporter_id: {
        type: String
    },
    date:{
        type:String
    }
});

const Review = mongoose.model('review',reviewSchema);

module.exports = Review;