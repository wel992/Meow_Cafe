var coffee = require('./models/coffee');
var order = require('./models/order');
var user = require('./models/users');
var cart = require('./models/cart');

var default_coffee = [
       // latte
       {
        id: 11,
        name: "Kitty Q Latte",
        price: 12.34,
        describe: "Coffee with milk",
        categoryId: 1,
        imageUrl: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
    },{
        id: 12,
        name: "Pure Cute Latte",
        price: 12.34,
        describe: "Coffee with milk",
        categoryId: 1,
        imageUrl: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
    },
    {
        id: 13,
        name: "Mashamellow Latte",
        price: 12.34,
        describe: "Coffee with milk",
        categoryId: 1,
        imageUrl: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
    },
    // cappuccino
    {
        id: 21,
        name: "Meow Cappuccino",
        price: 31.24,
        describe: "Coffee with double milk",
        categoryId: 2,
        imageUrl: "https://images.pexels.com/photos/982612/pexels-photo-982612.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
    },
    {
        id: 22,
        name: "Kitty ears Cappuccino",
        price: 31.24,
        describe: "Coffee with double milk",
        categoryId: 2,
        imageUrl: "https://images.pexels.com/photos/982612/pexels-photo-982612.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
    },
    {
        id: 23,
        name: "Kitty Paws Cappuccino",
        price: 31.24,
        describe: "Coffee with double milk",
        categoryId: 2,
        imageUrl: "https://images.pexels.com/photos/982612/pexels-photo-982612.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
    },
    //Espresso
    {
        id: 31,
        name: "Hairy Tail Espresso",
        price: 43.21,
        describe: "Coffee without milk",
        categoryId: 3,
        imageUrl: "https://images.pexels.com/photos/585754/pexels-photo-585754.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
    },
    {
        id: 32,
        name: "Glassbead Kiss Espresso",
        price: 43.21,
        describe: "Coffee without milk",
        categoryId: 3,
        imageUrl: "https://images.pexels.com/photos/585754/pexels-photo-585754.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
    },
    {
        id: 33,
        name: "Fuzzy Ball Espresso",
        price: 43.21,
        describe: "Coffee without milk",
        categoryId: 3,
        imageUrl: "https://images.pexels.com/photos/585754/pexels-photo-585754.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
    }
];

var default_orders = [
    {
        id:  1,
        time: new Date(),
        coffees: [{name: "Kitty Q Latte",quantity:3}, {name:"Fuzzy Ball Espresso", quantity:2}],
        feedback: "Good",
        userId: 2,
        total: 43.58
    },
    {
        id:  2,
        time: new Date(),
        coffees: [{name: "Kitty Q Latte",quantity:3}, {name:"Fuzzy Ball Espresso", quantity:2}],
        feedback: "Very Good",
        userId: 2,
        total: 74.45
    },
    {
        id:  3,
        time: new Date(),
        coffees: [{name: "Kitty Paws Cappuccino",quantity:3}, {name:"Meow Cappuccino", quantity:2}],
        feedback: "Great",
        userId: 3,
        total: 55.55
    },
    {
        id:  4,
        time: new Date(),
        coffees: [{name: "Mashamellow Latte",quantity:3}, {name:"Kitty Paws Cappuccino", quantity:2}],
        feedback: "Great",
        userId: 1,
        total: 99.5
    },
];

var default_carts = [
    {
        id:  1,
        coffees: [{name: "Mashamellow Latte",quantity:3}, {name:"Kitty Paws Cappuccino", quantity:2}],
        userId: 1
    },
    {
        id:  2,
        coffees: [{name: "Mashamellow Latte",quantity:3}, {name:"Kitty Paws Cappuccino", quantity:2}],
        userId: 2
    },
    {
        id:  3,
        coffees: [{name: "Fuzzy Ball Espresso",quantity:3}, {name:"Kitty Paws Cappuccino", quantity:2}],
        userId: 3
    }
];

var default_users = [
    {
        id: 1,
        name: "Jessica",
        password: "123456",
        phoneNum: 3054325567,
        orders: [2]
    },
    {
        id: 2,
        name: "Kevin",
        password: "qwerty",
        phoneNum: 3090043456,
        orders: [1]
    },
    {
        id: 3,
        name: "Chris",
        password: "asdfgh",
        phoneNum: 2581473690,
        orders: [3]
    },
];

function initDB(){
    default_orders.forEach(function(seed){
        order.create(seed,function(err,chatroom){
            if(err){
                console.log(err);
            }
            else{
                console.log("create order");
            }
        });
    });
    default_users.forEach(function(seed){
        user.create(seed,function(err,chatroom){
            if(err){
                console.log(err);
            }
            else{
                console.log("create user");
            }
        });
    });
    default_coffee.forEach(function(seed){
        coffee.create(seed,function(err,chatroom){
            if(err){
                console.log(err);
            }
            else{
                console.log("create coffee");
            }
        });
    });
    default_carts.forEach(function(seed){
        cart.create(seed,function(err,cart){
            if(err){
                console.log(err);
            }
            else{
                console.log("create cart");
            }
        });
    });
}

function seedDB(){
    // clear database
    coffee.remove({},function(err){
        if(err){
            console.log(err);
        }
        else {
            console.log("remove coffee");
            user.remove({},function(err){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("remove users");
                    order.remove({}, function(err){
                        if(err){
                            console.log(err);
                        }
                        else{
                            console.log("remove orders");
                            cart.remove({}, function(err){
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    initDB();
                                }
                            })
                        }
                    })
                }
            })            
        }
    });
}

module.exports = seedDB;