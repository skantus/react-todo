var db = require('mongoose');
var Schema = db.Schema;

var ObjectId = db.Schema.ObjectId;
var TodoSchema = new Schema({
  task: { type: String, trim: true, required: true },
  done: { type: Boolean, default: false }
});

/*Schema.methods.toJSON = function() {
  return {
  };
};

Schema.statics.add = function(args, fn) {

};

Schema.statics.get = function(args, fn) {

};

Schema.statics.fetch = function(args, fn) {

};

Schema.statics.change = function(args, fn) {

};

Schema.statics.delete = function(args, fn) {

};*/

var Todo = db.model('Todo', TodoSchema);
module.exports = Todo;
