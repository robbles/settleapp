/*jshint es5:true, laxcomma:true */

var Q = require('q');
var mongoose = require('mongoose');
var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var settings = require('./settings');

var UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: false },
  externalId: { type: String, required: true },
  avatarUrl: { type: String, required: true },
  owing: { type: Number, required: true },
});

var ExpenseSchema = new Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  buyer: { type: Schema.Types.ObjectId, ref: 'User' },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

var GroupSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  invited: [String],
});

GroupSchema.statics.findByUser = function (user, cb) {
  this.find({ members: user }, cb);
};

GroupSchema.statics.create = function (name, description, owner, invited, cb) {
  var group = new this({
    name: name,
    description: description,
    owner: owner,
    members: [owner],
    invited: invited
  });
  return group.save(cb);
};

var Group = exports.Group = mongoose.model('Group', GroupSchema);
var User = exports.User = mongoose.model('User', UserSchema);
var Expense = exports.Expense = mongoose.model('Expense', ExpenseSchema);

exports.connect = function() {
  return Q.ncall(mongoose.connect, mongoose, settings.DATABASE_URL);
};

