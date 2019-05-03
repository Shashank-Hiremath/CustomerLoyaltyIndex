var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/node-demo1");


var weightsSchema = new mongoose.Schema({
    value: Number,
    p5: Number,
    p4: Number,
    p3: Number,
    p2: Number,
    p1: Number
});
var dataSchema = new mongoose.Schema({
    user_id: String,
    name: String,
    cli: Number,
    weights: [weightsSchema]
});

const Data = module.exports = mongoose.model('Data', dataSchema, 'data');

module.exports.addData = function (newData, callback) {
    newData.save(callback);
}

var customerDataSchema = new mongoose.Schema({
    average_stars: Number,
    cli: Number,
    compliments: Number,
    cool: Number,
    fans: Number,
    friends_count: Number,
    funny: Number,
    name: String,
    review_count: Number,
    useful: Number,
    user_id: String
});
const customerData = mongoose.model('customerData', customerDataSchema, 'customerData');

module.exports.getCriterias = function(newData, callback){
    return customerData;
}

module.exports.showTable = function (newData, callback) {
    var CLI;
    var max_cool = 39079;
    var max_average_stars = 5;
    var max_compliments = 2888;
    var max_fans = 1394;
    var max_friends_count = 5103;
    var max_funny = 29364;
    var max_review_count = 3434;
    var max_useful = 49748;
    var j = 0;

    customerData.find({}, function (err, data) {
        data.forEach(function (d) {
            CLI = 0;
            var criterias = ['compliments', 'cool', 'useful', 'review_counts', 'friends', 'funny', 'fans', 'avg_stars'];
            var criterias_max = [max_compliments, max_cool, max_useful, max_review_count, max_friends_count, max_funny, max_fans, max_average_stars];
            for(var i=0;i<8;i++)
            {
                var sum = newData.weights[i].p1 +newData.weights[i].p2+newData.weights[i].p3+
                newData.weights[i].p4+newData.weights[i].p5;
                CLI += newData.weights[i].value*(
                    d[criterias[i]]/criterias_max[i] >= (newData.weights[i].p5)/sum +
                    d[criterias[i]]/criterias_max[i] >= (newData.weights[i].p5 + newData.weights[i].p4)/sum +
                    d[criterias[i]]/criterias_max[i] >= (newData.weights[i].p5 + newData.weights[i].p4 + newData.weights[i].p3)/sum +
                    d[criterias[i]]/criterias_max[i] >= (newData.weights[i].p5 + newData.weights[i].p4 + newData.weights[i].p3 + newData.weights[i].p2)/sum +
                    d[criterias[i]]/criterias_max[i] >= (newData.weights[i].p5 + newData.weights[i].p4 + newData.weights[i].p3 + newData.weights[i].p2 + newData.weights[i].p1)/sum
                );
            }
            // j = j+1;
            // j = Math.round((5000*Math.random));
            // j = Math.floor(Math.random() * 5000);  
            // j = 0;
            customerData.update({user_id: d.user_id}, {cli: CLI}, 
                function(err, affected, resp) {
                // console.log("here="+resp);
             });
        });
    });
    return customerData;
}