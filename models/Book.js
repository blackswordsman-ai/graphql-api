const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  authorId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author' 
  },
  categoryId:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Category"
  }]
});

module.exports = mongoose.model('Book', bookSchema);
