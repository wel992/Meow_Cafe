const express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var request = require('request');

var coffee = require('./models/coffee');
var user = require('./models/users');
var order = require('./models/order');
var cart = require('./models/cart');
var seed = require('./seed');

const app = express();
const port = 30000;
var mongodburl = "mongodb://admin:admin1@ds163738.mlab.com:63738/370db";
var user_id = 4;
var order_id = 5;
var cart_id = 4;

var weatherapiurl="https://api.darksky.net/forecast/8343627ac58e5517bea291cc8f7435cf/52.131802,-106.660767";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
mongoose.connect(mongodburl);

seed();

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.get("/coffee", function(req, res){
    console.log("get all coffee");
    coffee.find({}, function(err,allcoffee){
        if(err){
            console.log(err);
        }
        else{
            res.send(allcoffee);
        }
    })
})
// add cart 
// 结构为 {name: latte, quatity: 3}
// changed in seed
//      default_orders
// in irder.js
//      coffees[]
// front end send name and quatity

app.get("/coffee/:coffeeid", function(req, res){
    console.log("get one coffee");
    coffee.find({ id: req.params.coffeeid }, function(err,acoffee){
        if(err){
            console.log(err);
        }
        else{
            res.send(acoffee);
        }
    })
})

app.get("/cart/:userid", function(req, res){
    console.log("get cart");
    cart.find({userId : req.params.userid},function(err, cart){
        if(err){
            console.log(err);
        }
        else{
            console.log(cart)
            res.send(cart[0]);
        }
    })
})

app.post("/cart/:userid", function(req, res){
    console.log("update cart");
    console.log(req.body)
    cart.updateOne({userId : req.params.userid}, {$set:{coffees : req.body.coffees}},function(err, order){
        if(err){
            console.log(err);
        }
        else{
            res.send("update cart success")
        }
    })
})

app.get("/order/:userid", function(req, res){
    console.log("get all order for a user");
    order.find({userId : req.params.userid},function(err,orders){
        res.send(orders);
    })
})

app.post("/order", function(req,res){
    console.log("new order");
    var newOrder = {
        id:  order_id,
        time: Date.now(),
        coffees: req.body.coffees,
        feedback: "",
        userId: req.body.userID,
        total: req.body.total
    }
    order_id += 1;
    order.create(newOrder, function(err, order){
        if (err){
            res.send(err);
        }
        else{
            console.log("clear cart")
            cart.updateOne({userId : req.body.userID}, {$set:{coffees : []}},function(err, order){
                if(err){
                    console.log(err);
                }
                else{
                    res.send(order);
                }
            })
        }
    })
})

app.post("/order/:orderid", function(req,res){
    console.log("add feedback to an order");
    order.findOneAndUpdate({id: req.params.orderid},{$set:{feedback : req.body.feedback}},function(err, order){
        if(err){
            console.log(err);
        }
        else{
            res.send("add feedback success")
        }
    })
})

app.post("/signin",function(req,res){
    console.log("user signin");
    console.log(req.body)
    user.find({name: req.body.name}, function(err, userx){
        if(err || userx.length != 1){
            res.status(401).send("fail signin");
        }
        else{
            if (req.body.password === userx[0].password){
                res.status(200).send(userx[0]);
            }
            else{
                res.status(401).send("login fail");
            }
        }
    })
})

app.post("/signup",function(req,res){
    console.log("user signup");
    user.find({name: req.body.name}, function(err, userx){
        if(err){
            res.status(401).send("fail signup");
        }
        else if(userx.length !== 0){
            res.status(401).send("duplicate user name");
        }
        else{
            var newUser = {
                id: user_id,
                name: req.body.name,
                password: req.body.password,
                phoneNum: req.body.phoneNumber,
                orders: []
            };
            user.create(newUser, function(err, users){
                if(err){
                    res.status(401).send(err);
                }
                else{
                    var newCart = {
                        id: cart_id,
                        coffees: [],
                        userId: user_id
                    };
                    cart.create(newCart, function(err, carts){
                        if(err){
                            res.status(401).send(err);
                        }
                        else{
                            user_id += 1;
                            cart_id += 1;
                            res.status(200).send(users);
                        }
                    })
                }
            })
        }
    })
})

// app.get('/weather', function(req,res){
//     var lat = req.body.lat;
//     var lot = req.body.lot;
//     request(weatherapiurl.concat(lat,",",lot),function(err2,responce2,body2){
//         if(err2){
//             console.log(err2);
//         } 
//         else{
//             res.send(body);
//         }
//      });
// })

app.get('/coffeeweather/:temp', function(req,res){
    console.log("get all coffee");
    var temp = req.params.temp;
    var random1 = Math.floor(Math.random(temp) * 2) + 11;
    var random2 = Math.floor(Math.random(temp) * 2) + 21;
    var random3 = Math.floor(Math.random(temp) * 2) + 31;
    console.log(random1,random2,random3)
    coffee.find({$or:[{id : random1}, {id : random2}, {id : random3}]}, function(err,allcoffee){
        if(err){
            console.log(err);
        }
        else{
            res.send(allcoffee);
        }
    })
})