const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content:String,
  commentabelId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
  },
  commentabelType:{
    type:String,
    enum:["Post","Video"],
    required:true
  }
});

module.exports = mongoose.model('Comment', commentSchema);
