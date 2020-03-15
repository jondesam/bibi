const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  bibim: {
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
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  parentId: { type: String },
  parentPost: {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    text: {
      type: String
      // required: true
    },
    name: {
      type: String
    },
    avatar: {
      type: String
    }
  },

  comments: [
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
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      },
      likes: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
          }
        }
      ]
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model('post', PostSchema);
