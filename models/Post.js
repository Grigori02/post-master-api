const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  message: {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    media: {
      type: String,
      required: true,
    },
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', postSchema);
