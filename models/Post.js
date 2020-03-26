const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  bibimId: {
    type: String
  },
  bibimName: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String,
    required: true
  },
  userName: {
    type: String
  },

  avatar: {
    type: String
  },
  topParentId: { type: String },
  parentId: { type: String },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  parentId: { type: String },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      userName: {
        type: String
      },
      text: {
        type: String,
        required: true
      },
      bibimName: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model('post', PostSchema);
