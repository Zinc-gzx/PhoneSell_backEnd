const USER_DATASET = "./data/datasets/userlist.json";
const PHONELIST_DATASET = "./data/datasets/phonelisting.json";

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 8;

var usersRaw = require(USER_DATASET);
// var userProfilePhoneList = require(PHONELIST_DATASET);
var PhoneList = require(PHONELIST_DATASET);

const User = require("./app/models/User");
// const UserProfilePhone = require("./app/models/userProfile");
const Phone = require("./app/models/Phone");

var userInstances = [];
var password = bcrypt.hashSync("Password.", saltRounds);  // Default password for all initial users
usersRaw.forEach(user => {
    userInstances.push(new User({
        _id: mongoose.Types.ObjectId(user._id.$oid),
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: password,
    }));
});


var PhoneInstances = [];
PhoneList.forEach(phone => {
    PhoneInstances.push(new Phone({
        // _id: mongoose.Types.ObjectId(phone._id.$oid),
        title: phone.title,
        brand: phone.brand,
        image: phone.brand+".jpeg",
        stock: phone.stock,
        seller: phone.seller,
        price: phone.price,
        reviews: phone.reviews,
        disabled: phone.disabled,
    }));
});

mongoose.connect("mongodb+srv://zincgao:GAOxin991231@zinc.h7k65is.mongodb.net/PhoneSelling",{
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    useCreateIndex: true,
},(err) => {
    if (err){
        console.log(err);
    }else{
            console.log("Database cleared.");
            User.insertMany(userInstances).then(() => {
                console.log("Users created.");
            })
            Phone.insertMany(PhoneInstances).then(() => {
                console.log("Phones created.");
                mongoose.disconnect();
            })
            // UserProfilePhone.insertMany(userProfilePhoneInstances).then(() => {
            //     console.log("UserProfilePhones created.");
            //     mongoose.disconnect();
            // })
            
    }
});