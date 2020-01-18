const mongoose = require('mongoose');
const schema = mongoose.Schema;

const PostItemschema = new schema({
    uploader_id:{
        type:String
        
    },
    uploader_name:{
         type:String,
         default:"unknown"
    },
    profile_pic_url:{
        type:String,
        default:null

    },
    date_time:{
        type:String,
        default:null
    },
    reports:{
        type:Number,
        default:0
    },
    post_url:{
        type:String,
        default:null
    },
    likes:{
        type:Number,
        default:0
    },
    dislikes:{
        type:Number,
        default:0
    },
    en_revs:{
        type:Boolean,
        default:false
    },
    caption:{
        type:String
    },
    post_type:{
        type:String
    },
    hide_status:{
        type:Boolean,default:false
    },
    num_reviews:{
        type:Number,default:0 
    } ,
    comments:[{
        cprofile_id:{
            type:String
        },
        cname:{
            type:String
        },
        cprof_pic_url:{
            type:String
        },
        comment:{
            type:String
        },
        cDateTime:{
            type:String
        },
        clikes:{
            type:Number,
            default:0
        },
        cdislikes:{
            type:Number,
            default:0
        }
    }]
      
});

const PostItem = mongoose.model('post_item',PostItemschema);

module.exports = PostItem;