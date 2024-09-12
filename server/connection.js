const mongoose = require("mongoose")

const connectDb = async () => {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    if(connection.STATES.uninitialized){
        console.log("Database is not connected");
    }

    if(connection.STATES.connecting){
        console.log("Database is connecting");
    }

    if(connection.STATES.connected){
        console.log("Database is connected");
    }
   
    if(connection.STATES.disconnected){
        console.log("Database is disconnected");
    }
}
module.exports =  {connectDb}