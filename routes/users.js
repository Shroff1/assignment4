/*users.js
* The file below routes all urls with /users/
*/
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Laptop =require ('../models/laptopModel.js');
var multer = require('multer');
var bodyparser = require('body-parser');
var app = express();
//var upload = multer({'dest: public/order/'});

router.get('/',(req, res, next)=>{
  Laptop.find({})
    .then((laptop)=>{
      console.log(laptop);
        res.render('user', {
            laptop : laptop
        });
    });
  });

router.post('/', (req, res, next)=>{
var laptop1 = {
   "partNumber": req.body.partNumber,
   "laptopName": req.body.laptopName,
   "laptopQty": req.body.laptopQty,
   "countryOrder": req.body.countryOrder,
   "targetPrice": req.body.targetPrice,
   "repName": req.body.repName
 }
console.log(laptop1);
var laptop = new Laptop(laptop1);
laptop.save()
  .then(()=>{
    console.log("Data is saved!");
    res.redirect("/users/");
  })
  .catch((err)=>{
    if(err){
      console.log(err);
      throw new Error("OrderSaveError", laptop);
    }
  });
});

router.use((err,req,res,next)=>{
  if(err.message=="OrderSaveError"){
    res.render("There is an error in saving the order!");
    res.redirect('/users');
  }else{
    next(err);
  }
});

module.exports = router;
