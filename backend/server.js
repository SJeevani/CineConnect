// create express app
const exp=require('express')
const cors = require('cors');
const app=exp()
require('dotenv').config()//process.env.PORT
const mongoClient=require('mongodb').MongoClient
const path=require('path')


// // deploy react build in this server
// app.use(exp.static(path.join(__dirname,'../client/build')))
app.use(cors()); 
// to parse the body of req
app.use(exp.json())

// connect to DB
mongoClient.connect(process.env.DB_URL)
.then(client=>{
    // get db object
    const webdb=client.db('moviedb')
    // get collection object
    const adminsCollection=webdb.collection('adminsCollection')
    const usersCollection=webdb.collection('usersCollection')
    const moviesCollection=webdb.collection('moviesCollection')
    // share collection with express app
    app.set('adminsCollection',adminsCollection)
    app.set('usersCollection',usersCollection)
    app.set('moviesCollection',moviesCollection)
    // confirm db connection status
    console.log("DB connection success")
})
.catch(err=>console.log("err in db connection",err))


// import api routes
const userApp=require('./APIs/user-api')
const adminApp=require('./APIs/admin-api')

// if path starts with user-api then send the request to userapp
app.use('/user-api',userApp)
// else to adminapp
app.use('/admin-api',adminApp)

// deals with page refresh
// app.use((req,res,next)=>{
//     res.sendFile(path.join(__dirname,'../client/build/index.html'))
// })

// express error handler
app.use((err,req,res,next)=>{
    res.send({message:"error",payload:err.message})
})

// assign port number
const port=process.env.PORT || 5000
app.listen(port,()=>console.log(`web server on port ${port}`))