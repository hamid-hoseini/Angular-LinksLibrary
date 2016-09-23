var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('Users', new Schema({
	link: String,
    title: String,
	subject: String,
	rate: Number,
	description: String
}));