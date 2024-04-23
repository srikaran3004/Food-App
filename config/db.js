const colors = require("colors");
const mongoose = require('mongoose')

//function mongodb database collection
const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URl)
        console.log(`Connected to Database ${mongoose.connection.host}`.bgWhite);
    }catch(error){
        console.log('Db Error',error);
    }
};

module.exports = connectDb;