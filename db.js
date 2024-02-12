require('dotenv').config();
const mongoose=require('mongoose');

const URI=process.env.MONGODB
// mongoose.connect(URI,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     serverSelectionTimeoutMS:6000000
// }).then(()=>{
//     console.log('Connected to MongoDB')
// }).catch(e=>console.error(`Failed to connect: ${e}`));

const connectDB=async()=>{
    try{
const con=await mongoose.connect(URI);
console.log(`MongoDB connected: ${con.connection.host}`)
    }catch(e){
        console.error(e);
    }
}

module.exports=connectDB;