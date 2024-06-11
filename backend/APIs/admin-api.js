const exp = require('express');
const adminApp = exp.Router();
const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const verifyToken = require('../middlewares/verifyToken');

let adminsCollection;
let moviesCollection;

// get user collection object
adminApp.use((req, res, next) => {
    usersCollection = req.app.get('usersCollection')
    adminsCollection = req.app.get('adminsCollection');
    moviesCollection = req.app.get('moviesCollection');
    next();
});


// admin login
adminApp.post('/login', expressAsyncHandler(async (req, res) => {
    // get user credentials from client
    const adminCred = req.body;
    // check for username
    const dbAdmin = await adminsCollection.findOne({ username: adminCred.username });
    // console.log(dbAdmin)
    if (dbAdmin === null) {
        res.send({ message: "Invalid username" });
    } else {
        // check for password
        if (dbAdmin.password !== adminCred.password) {
            res.send({ message: "Invalid password" });
        } else {
            // create jwt token and encode it
            const signedToken = jwt.sign({ username: dbAdmin.username }, process.env.SECRET_KEY, { expiresIn: '1d' });
            // send res
            res.send({ message: "Login success", token: signedToken, user: dbAdmin });
        }
    }
}));

// get genres
adminApp.get('/genres',verifyToken,expressAsyncHandler(async(req,res)=>{
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

// get movies(latest to oldest)
adminApp.get('/movies-new',verifyToken,expressAsyncHandler(async(req,res)=>{
  let movies=await moviesCollection.find().toArray()
  // console.log(movies)
  res.send({message:"latest movies",payload:movies})
}))


// get movies(oldest to latest)
adminApp.get('/movies-old',verifyToken,expressAsyncHandler(async(req,res)=>{
  let movies=await moviesCollection.find().toArray()
  movies.reverse()
  // console.log(movies)
  res.send({message:"old movies",payload:movies})
}))

// Get movies based on selected genres
adminApp.post('/movies-genre', verifyToken, expressAsyncHandler(async (req, res) => {
  const { genres } = req.body;
  let query = {};
  if (genres && genres.length > 0) {
    query = { movie_genres: { $in: genres } };
  }
  let movies = await moviesCollection.find(query).toArray();
  res.send({ message: "Movies by genre", payload: movies });
}));

// get popular movies(descending)
adminApp.get('/popular',verifyToken,expressAsyncHandler(async(req,res)=>{
  let movies=await moviesCollection.find().sort({popularity:-1}).toArray()
  // console.log(movies)
  res.send({message:"all popular movies",payload:movies})
}))

// get movies in ascending order of title
adminApp.get('/moviesort',verifyToken,expressAsyncHandler(async(req,res)=>{
 let movies=await moviesCollection.find().sort({title:1}).toArray()
 // console.log(movies)
 res.send({message:"Movies in ascending order",payload:movies})
}))

// get movies in descending order of title
adminApp.get('/moviesortreverse',verifyToken,expressAsyncHandler(async(req,res)=>{
  let movies=await moviesCollection.find().sort({title:-1}).toArray()
  // console.log(movies)
  res.send({message:"Movies in descending order",payload:movies})
}))

// get top 100 trending movies
adminApp.get('/trending',verifyToken,expressAsyncHandler(async(req,res)=>{
  let movies=await moviesCollection.find().sort({popularity:-1}).limit(100).toArray()
  // console.log(movies)
  res.send({message:"top 100 popular movies",payload:movies})
}))


// delete or restore movies
adminApp.put('/movie/:id',verifyToken,expressAsyncHandler(async(req,res)=>{
  // get id from url
  const idFromUrl=(+req.params.id)
  // get movie
  const movieToDelete=req.body
  if(movieToDelete.availability_status===true){
    let modifiedMovie=await moviesCollection.findOneAndUpdate({id:idFromUrl},{$set:{...movieToDelete,availability_status:false}},{returnDocument:"after"})
    res.send({message:"Movie Deleted",payload:modifiedMovie.availability_status})
  }
  if(movieToDelete.availability_status===false){
    let modifiedMovie=await moviesCollection.findOneAndUpdate({id:idFromUrl},{$set:{...movieToDelete,availability_status:true}},{returnDocument:"after"})
    res.send({message:"Movie Restored",payload:modifiedMovie.availability_status})
  }
}))

// get deleted movies
adminApp.get('/movies-deleted',verifyToken,expressAsyncHandler(async(req,res)=>{
  let movies=await moviesCollection.find({availability_status:false}).toArray()
  // console.log(movies)
  res.send({message:"Deleted movies",payload:movies})
}))

// requests for admin dashboard

// get total number of users
adminApp.get('/users-count', verifyToken, expressAsyncHandler(async (req, res) => {
  const usersCount = await usersCollection.countDocuments();
  res.send({ message: "Total users count", payload: usersCount });
}));

// get total number of movies and their availability status
adminApp.get('/movies-count', verifyToken, expressAsyncHandler(async (req, res) => {
  const totalMovies = await moviesCollection.countDocuments();
  const availableMovies = await moviesCollection.countDocuments({ availability_status: true });
  const unavailableMovies = await moviesCollection.countDocuments({ availability_status: false });
  res.send({ message: "Movies count", payload: { totalMovies, availableMovies, unavailableMovies } });
}));

// get number of movies per genre
adminApp.get('/movies-per-genre', verifyToken, expressAsyncHandler(async (req, res) => {
  const moviesPerGenre = await moviesCollection.aggregate([
      { $unwind: "$movie_genres" },
      { $group: { _id: "$movie_genres", count: { $sum: 1 } } },
      { $project: { _id: 0, genre: "$_id", count: 1 } }
  ]).toArray();
  res.send({ message: "Movies per genre", payload: moviesPerGenre });
}));

// get number of movies per release year
adminApp.get('/movies-per-year', verifyToken, expressAsyncHandler(async (req, res) => {
  const moviesPerYear = await moviesCollection.aggregate([
      { $group: { _id: "$release_year", count: { $sum: 1 } } },
      { $project: { _id: 0, year: "$_id", count: 1 } }
  ]).toArray();
  res.send({ message: "Movies per year", payload: moviesPerYear });
}));

// get number of movies based on budget ranges
adminApp.get('/movies-per-budget', verifyToken, expressAsyncHandler(async (req, res) => {
  const moviesPerBudget = await moviesCollection.aggregate([
      {
          $bucket: {
              groupBy: "$budget",
              boundaries: [0,100000, 500000, 1000000,5000000,10000000,50000000,100000000, Infinity],
              default: "Other",
              output: {
                  count: { $sum: 1 }
              }
          }
      },
      { $project: { _id: 0, range: "$_id", count: 1 } }
  ]).toArray();
  res.send({ message: "Movies per budget", payload: moviesPerBudget });
}));

// get number of movies based on popularity ranges
adminApp.get('/movies-popularity', verifyToken, expressAsyncHandler(async (req, res) => {
  const moviesPopularity = await moviesCollection.aggregate([
    {
      $bucket: {
        groupBy: "$popularity",
        boundaries: [0,10,30,50,70, Infinity],
        default: "Other",
        output: {
          count: { $sum: 1 }
        }
      }
    },
    { $project: { _id: 0, range: "$_id", count: 1 } }
  ]).toArray();
  res.send({ message: "Movies popularity", payload: moviesPopularity });
}));




module.exports = adminApp;
