const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

const convertID = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

let BoardModel = {};

const BoardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    time: true,
    set: setName,
  },
  tickets: {
    type: Array,
    required: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

BoardSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  tickets: doc.tickets,
});

BoardSchema.statics.findByOwner = (ownerID, callback) => {
  const search = {
    owner: convertID(ownerID),
  };

  return BoardModel.find(search).select('name tickets').exec(callback);
};

BoardModel = mongoose.model('Board', BoardSchema);

module.exports.BoardModel = BoardModel;
module.exports.BoardSchema = BoardSchema;
