const express = require("express")
const route = require("./routes/route")
const app = express()
require("dotenv").config()

const mongoose = require("mongoose")
mongoose.connect(process.env.MongoDBURL,{useNewUrlParser:true})
.then(()=>console.log("MOngoDB is Connected"))
.catch((err)=>console.log(err.message))

const cors = require('cors');
app.use(cors({
    origin: '*'
}));


app.use(express.json())

app.use("/",route)

app.listen(process.env.PORT,()=>{console.log("Express App is running on PORT "+process.env.PORT)})