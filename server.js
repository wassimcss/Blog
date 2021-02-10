const express = require("express")
const mongoose  = require("mongoose")
require('dotenv').config()
const cors = require("cors")
const cookieParser = require("cookie-parser")
const fileupload = require("express-fileupload")

const app = express()

app.use(express.json());
app.use(cors());
app.use(cookieParser())
app.use(fileupload({useTempFiles:true}))


app.use("/user",require("./routes/userRoute"))
app.use("/api",require("./routes/uploadRoute"))
app.use("/api",require("./routes/postRoute"))

//connect to database
mongoose.connect(process.env.mongoURI,{useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex:true},(err)=>{
    if (err) console.log(err)
    else console.log("DB connected")
})

const PORT = process.env.PORT || 5000
app.listen(PORT,(err)=> {
    if (err) throw err
    else {
        console.log(`Server is runing on port ${PORT}`)
    }
})