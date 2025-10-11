const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name:{
    type:String,
    require:true
  },
  parentCategory:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Category",
    default:null
  }
});

module.exports = mongoose.model('Category', categorySchema);
