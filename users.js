var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/node-demo1");
var nameSchema = new mongoose.Schema({
    firstName: String,
    lastName: String
});
const User = module.exports = mongoose.model("User", nameSchema);

module.exports.adduser=function(newUser,callback)
{
    newUser.save(callback)
}