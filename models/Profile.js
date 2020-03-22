const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },

  bio: {
    type: String
  },

  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  },
  subscriptions: [
    {
      bibimId: {
        type: Schema.Types.ObjectId,
        ref: 'bibims'
      },
      bibimName: {
        type: String,
        ref: 'bibims'
      }
    }
  ]
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
