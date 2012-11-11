/*jshint es5:true, laxcomma:true */

var Q = require('Q');
var mongoose = require('mongoose');
var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var DATABASE_URL = 'mongodb://settleapp:xBOEidj64v@ds039267.mongolab.com:39267/settleapp';

var UserSchema = new Schema({
  name: { type: String, required: true },
});

var InvitedSchema = new Schema({
  address: { type: String, required: true },
});

var ExpenseSchema = new Schema({
  amount: { type: Number, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

var GroupSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  invited: [{ type: Schema.Types.ObjectId, ref: 'Invited' }],
});

var Group = exports.Group = mongoose.model('Group', GroupSchema);
var User = exports.User = mongoose.model('User', UserSchema);
var Invited = exports.Invited = mongoose.model('Invited', InvitedSchema);
var Expense = exports.Expense = mongoose.model('Expense', ExpenseSchema);

exports.connect = function() {
  return Q.ncall(mongoose.connect, mongoose, DATABASE_URL);
};

