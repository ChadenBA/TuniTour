const express = require("express")
const conncectDB=require("./config/db")
const cors=require("cors")
const { errorHandler, notFound } = require("./middleware/error")

const fs = require('fs');
const pino = require('pino');



//xith this you can read from the .env file 
require("dotenv").config()
//pour lutter contre les attaques xss(protect our api)
const xss=require("xss-clean");
//connexion to db 
conncectDB()

// init server 
const app=express()
//midleware
app.use(express.json())

//prevent xss (cross side scripting) attack 
// va rendre une balise html like this (&lt;h1>)
app.use(xss())

//cors policy
app.use(cors());

const logFileStream = fs.createWriteStream('./logs.log', { flags: 'a' });
const logger = pino({
    level: 'info',
    base: null,
    prettyPrint: false
}, logFileStream)

app.post('/api/log', (req, res) => {
    logger.info(req.body);
    res.send('Log data received successfully');
});


//route
app.use("/api/admin/auth" , require("./routes/loginRoute")) 
app.use("/api/admin" , require("./routes/adminRoute")) 
app.use("/api/endroits" , require("./routes/placeRoute")) 
app.use("/api/admin/password" , require("./routes/passwordRoute"));
app.use("/api/categories" , require("./routes/categoryRoute"))
app.use("/api/cities", require("./routes/cityRoute"))
app.use("/api/agencies", require("./routes/agencyRoute"))
app.use("/api/activities", require("./routes/activityRoute"))
app.use("/api/comment", require("./routes/commentRoute"))
//1 : authentification 
app.use("/api/tunitour/auth",require("./routes/userAuthRoute"))
//2: profile management
app.use("/api/tunitour/users",require("./routes/UserRoute"))
//9: rate management
app.use("/api/rate",require('./routes/rateRoute'))

//Error handler middleware 
app.use(notFound)
app.use(errorHandler)



//running the server 
const PORT = process.env.PORT ||8000;
const server = app.listen(PORT,()=>console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`))
module.exports = server