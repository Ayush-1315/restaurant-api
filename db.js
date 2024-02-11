require('dotenv').config();
const mongoose=require('mongoose');

const URI=process.env.MONGODB
mongoose.connect(URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Connected to MongoDB')
}).catch(e=>console.error(`Failed to connect: ${e}`));