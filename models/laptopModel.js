var mongoose = require('mongoose');

// creating a schema constructor
var Schema = mongoose.Schema;

//creating a schema template for the laptop information.
var schema = new Schema ({
    partNumber: {type :String, required:false},
    laptopName: {type :String, required:false},
    laptopQty: {type :Number, required:false},
    countryOrder: {type :String, required:false},
    targetPrice: {type :Number, required:false},
    repName: {type :String, required:false},
    createdAt: {type :Date}
});


schema.pre('save', function(next){
  this.createdAt = new Date();
  next();
})

//exporting the model.
module.exports = mongoose.model("Laptop", schema);
