const express=require('express');
const app=express();
const port=8900;
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const routes=require('./routes/routes')

//intlizing all the libraries
app.use(bodyParser.json());
app.use('/',routes);


//handling CORS issure
app.use((req,res,next)=>{

    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,UPDATE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    next();
})

//connecting to mongodb

mongoose.connect(
    'mongodb+srv://Praveen:Praveen123@cluster0.2bfat.mongodb.net/Zomato?retryWrites=true&w=majority',
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
    
).then((success)=>{

    console.log("mongodb connected");

    app.listen(port,()=>{
        console.log(`server is running on ${port}`);
    })
}).catch((err)=>{
    
    console.log(`Error occured while Connecting ${err}`)
})





