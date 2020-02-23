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
  subscriptions: [
    {
      profileId: {
        type: Schema.Types.ObjectId,
        ref: 'profiles'
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
      bibim: {
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
          }
        }
      ],
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

module.exports = Bibim = mongoose.model('bibim', BibimSchema);
