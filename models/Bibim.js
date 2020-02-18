const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BibimSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  creater: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  createrName: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  subscription: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  posts: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Bibim = mongoose.model('bibim', BibimSchema);
