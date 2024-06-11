// create user-api app
const exp=require('express')
const userApp=exp.Router()
const bcryptjs=require('bcryptjs')
const expressAsyncHandler=require('express-async-handler')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const verifyToken=require('../middlewares/verifyToken')

let usersCollection
let moviesCollection
// get user collection object
userApp.use((req,res,next)=>{
    usersCollection=req.app.get('usersCollection')
    moviesCollection=req.app.get('moviesCollection')
    next()
})

// user registration route
userApp.post('/user',expressAsyncHandler(async(req,res)=>{
    // get user resource from client
    const newUser=req.body
    // add usertype as user
    newUser.userType="user"
    newUser.favorites=[]
    // check for duplicate users based on username
    const dbUser=await usersCollection.findOne({username:newUser.username})
    // if user found in db
    if (dbUser!==null){
        res.send({message:"User already exists"})
    }
    else{
        // hash paasword
        const hashedPassword=await bcryptjs.hash(newUser.password,5)
        // replace plain password with hashed password
        newUser.password=hashedPassword
        // create new user
        await usersCollection.insertOne(newUser)
        // send repsonse
        res.send({message:"New user created"})
    }
}))


// user login
userApp.post('/login',expressAsyncHandler(async(req,res)=>{
    // get user credentails from client
    const userCred=req.body
    // check for username
    const dbUser=await usersCollection.findOne({username:userCred.username})
    if (dbUser===null){
        res.send({message:"Invalid username"})
    }else{
        // check for password
        const status=await bcryptjs.compare(userCred.password,dbUser.password)
        if(status===false){
            res.send({message:"Invalid password"})
        }else{
            // create jwt token and encode it
            const signedToken=jwt.sign({username:dbUser.username},process.env.SECRET_KEY,{expiresIn:'1d'})
             // send res
            res.send({message:"Login success",token:signedToken,user:dbUser})
        }
    }
}))

// get genres
userApp.get('/genres',verifyToken,expressAsyncHandler(async(req,res)=>{
    let genres=await moviesCollection.aggregate([
        { $unwind: "$movie_genres" },
        { 
          $group: {
            _id: null, 
            uniqueGenres: { $addToSet: "$movie_genres" }
          }
        },
        { 
          $project: { 
            _id: 0, 
            uniqueGenres: 1 
          }
        }
      ]).toArray()
    let genres_list=genres[0].uniqueGenres
    // console.log(genres_list)
    res.send({ message: "Genres", payload: genres_list });
}))

// Get movies based on selected genres
userApp.post('/movies-genre', verifyToken, expressAsyncHandler(async (req, res) => {
    const { genres } = req.body;
    let query = {};
    if (genres && genres.length > 0) {
      query = { movie_genres: { $in: genres } };
    }
    let movies = await moviesCollection.find(query,{availability_status:true}).limit(10).toArray();
    res.send({ message: "Movies by genre", payload: movies });
  }));

// get movies(latest to oldest)
userApp.get('/movies-new',verifyToken,expressAsyncHandler(async(req,res)=>{
    let movies=await moviesCollection.find({availability_status:true}).toArray()
    // console.log(movies)
    res.send({message:"latest movies",payload:movies})
}))


// get movies(oldest to latest)
userApp.get('/movies-old',verifyToken,expressAsyncHandler(async(req,res)=>{
    let movies=await moviesCollection.find({availability_status:true}).toArray()
    movies.reverse()
    // console.log(movies)
    res.send({message:"old movies",payload:movies})
}))


// get popular movies(descending)
userApp.get('/popular',verifyToken,expressAsyncHandler(async(req,res)=>{
    let movies=await moviesCollection.find({availability_status:true}).sort({popularity:-1}).toArray()
    // console.log(movies)
    res.send({message:"all popular movies",payload:movies})
}))

// get movies in ascending order of title
userApp.get('/moviesort',verifyToken,expressAsyncHandler(async(req,res)=>{
   let movies=await moviesCollection.find({availability_status:true}).sort({title:1}).toArray()
   // console.log(movies)
   res.send({message:"Movies in ascending order",payload:movies})
}))

// get movies in descending order of title
userApp.get('/moviesortreverse',verifyToken,expressAsyncHandler(async(req,res)=>{
    let movies=await moviesCollection.find({availability_status:true}).sort({title:-1}).toArray()
    // console.log(movies)
    res.send({message:"Movies in descending order",payload:movies})
 }))

// get top 100 trending movies
userApp.get('/trending',verifyToken,expressAsyncHandler(async(req,res)=>{
    let movies=await moviesCollection.find({availability_status:true}).sort({popularity:-1}).limit(100).toArray()
    // console.log(movies)
    res.send({message:"top 100 popular movies",payload:movies})
}))

// post comments
userApp.post('/add-comment/:id',verifyToken,expressAsyncHandler(async(req,res)=>{
    const userComment=req.body
    const idFromUrl=(+req.params.id)
    let result=await moviesCollection.updateOne({id:idFromUrl},{$addToSet:{comments:userComment}})
    // console.log(result)
    res.send({message:"Comment posted"})
}))

// add to favorites
userApp.post('/movie/favorite/:id/add', verifyToken, expressAsyncHandler(async (req, res) => {
    const { username } = req.body;
    const id = req.params.id;
    
    let result = await usersCollection.updateOne(
        { username }, 
        { $addToSet: { favorites: id } }
    );
    
    if (result.modifiedCount > 0) {
        res.send({ message: 'Successfully added to favorites' });
    } else {
        res.send({ message: 'Failed to add to favorites' });
    }
}));

// remove from favorites
userApp.post('/movie/favorite/:id/remove', verifyToken, expressAsyncHandler(async (req, res) => {
    const { username } = req.body;
    const id = req.params.id;
    
    let result = await usersCollection.updateOne(
        { username }, 
        { $pull: { favorites: id } }
    );
    
    if (result.modifiedCount > 0) {
        res.send({ message: 'Successfully removed from favorites' });
    } else {
        res.send({ message: 'Failed to remove from favorites' });
    }
}));

// get all favorites
userApp.get('/movies/favorites/:username', expressAsyncHandler(async (req, res) => {
    const username = req.params.username;
    
    try {
        // Find the user
        const user = await usersCollection.findOne({ username: username });
        
        // If user does not exist
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        
        // Check if the user has favorites
        if (!user.favorites || user.favorites.length === 0) {
            return res.send({ message: "No favorite movies found", payload: [] });
        }
        
        // Convert favorites to the correct type if necessary
        const favoriteIds = user.favorites.map(id => typeof id === 'string' ? parseInt(id, 10) : id);
        
        // Find the favorite movies
        const favorites = await moviesCollection.find({ id: { $in: favoriteIds } }).toArray();
        
        // Send the favorites back
        res.send({ message: "Favorite Movies", payload: favorites });
    } catch (error) {
        console.error('Error fetching favorite movies:', error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}));



// export user  App
module.exports=userApp