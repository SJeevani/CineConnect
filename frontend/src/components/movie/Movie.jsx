import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { axiosWithToken } from '../../axiosWithToken.jsx';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, IconButton, Tooltip } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import Rating from '@mui/material/Rating';
import { MdDelete, MdRestore } from 'react-icons/md';
import { MdOutlineAddCircle } from "react-icons/md";
import './Movie.css';
import { addFavoriteThunk, removeFavoriteThunk } from '../../redux/slices/UserAdminSlice';

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

function Movie() {
    const { state } = useLocation();
    const { currentUser } = useSelector((state) => state.userAdminLoginReducer);
    const dispatch = useDispatch();

    const [comments, setComments] = useState(state.comments || []);
    const [open, setOpen] = useState(false);
    const [newComment, setNewComment] = useState({ rating: 0, comment: '' });
    const [currentMovie, setCurrentMovie] = useState(state);
    // Ensure both state.id and favorites array items are of the same type (string)
    const movieId = state.id.toString();
    const [isFavorite, setIsFavorite] = useState(currentUser?.favorites?.map(id => id.toString()).includes(movieId));

    useEffect(() => {
        setIsFavorite(currentUser?.favorites?.map(id => id.toString()).includes(movieId));
    }, [currentUser, movieId]);

    const {
        title, release_date, release_year, vote_average, overview, poster_path,
        budget, revenue, movie_genres, movie_keywords, original_language, vote_count,
        popularity, tagline, backdrop_path, homepage, imdb_id, runtime, adult,
        status, original_title
    } = currentMovie;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handlePostComment = async () => {
        const commentToAdd = {
            username: currentUser.username,
            rating: newComment.rating,
            comment: newComment.comment,
        };
        try {
            await axiosWithToken.post(`http://localhost:4000/user-api/add-comment/${state.id}`, commentToAdd);
            setComments([...comments, commentToAdd]);
            handleClose();
        } catch (error) {
            console.error('Failed to post comment', error);
        }
    };

    const deleteMovie = async () => {
        let movie = { ...currentMovie };
        delete movie._id;
        let res = await axiosWithToken.put(`http://localhost:4000/admin-api/movie/${currentMovie.id}`, movie);
        if (res.data.message === 'Movie Deleted') {
            setCurrentMovie({ ...currentMovie, availability_status: res.data.payload });
        }
    };

    const restoreMovie = async () => {
        let movie = { ...currentMovie };
        delete movie._id;
        let res = await axiosWithToken.put(`http://localhost:4000/admin-api/movie/${currentMovie.id}`, movie);
        if (res.data.message === 'Movie Restored') {
            setCurrentMovie({ ...currentMovie, availability_status: res.data.payload });
        }
    };

    const toggleFavorite = async () => {
        if (isFavorite) {
            await dispatch(removeFavoriteThunk(state.id));
            setIsFavorite(false);
        } else {
            await dispatch(addFavoriteThunk(state.id));
            setIsFavorite(true);
        }
    };

    return (
        <div className="movie-details">
            <div className="movie-header" style={{ backgroundImage: `url(${BASE_IMAGE_URL}${backdrop_path})` }}>
                <div className="movie-overlay">
                    <img src={`${BASE_IMAGE_URL}${poster_path}`} alt={title} className="movie-poster" />
                    <div className="movie-info">
                        <h1>{title} <span>({release_year})</span></h1>
                        <p className="tagline">{tagline}</p>
                        <div className="movie-meta">
                            <span>Release Date: {release_date}</span>
                            <span>Rating: {vote_average}</span>
                            <span>Votes: {vote_count}</span>
                            <span>Popularity: {popularity}</span>
                            <span>Language: {original_language}</span>
                            {runtime && <span>Runtime: {runtime} mins</span>}
                            {status && <span>Status: {status}</span>}
                            {original_title && <span>Original Title: {original_title}</span>}
                            {adult !== undefined && <span>Adult: {adult ? 'Yes' : 'No'}</span>}
                            {imdb_id && <span>IMDB ID: {imdb_id}</span>}
                        </div>
                        <p className="movie-overview">{overview}</p>
                        {currentUser && currentUser.userType === 'user' && (
                            <Tooltip 
                            title={isFavorite ? "Remove from favorites" : "Add to favorites"} 
                            arrow 
                            classes={{ tooltip: 'custom-tooltip', arrow: 'custom-arrow' }}
                        >
                            <IconButton onClick={toggleFavorite} color="error" size="large" className='favoriteicon' variant="soft">
                                {isFavorite ? <Favorite /> : <FavoriteBorder />}
                            </IconButton>
                        </Tooltip>
                        )}
                    </div>
                </div>
            </div>
            <div className="movie-body">
                <div className="movie-comments p-3 rounded-3">
                    <h3>Comments</h3>
                    {comments.length > 0 ? (
                        comments.map((comment, index) => (
                            <div key={index} className="comment">
                                <Rating value={comment.rating} readOnly />
                                <p><strong>{comment.username}</strong>: {comment.comment}</p>
                            </div>
                        ))
                    ) : (
                        <p>No comments yet. Be the first to comment!</p>
                    )}
                    {currentUser && currentUser.userType !== 'admin' && (
                        <Button startIcon={<MdOutlineAddCircle />} variant="contained" color="primary" onClick={handleClickOpen} >
                            Add Comment
                        </Button>
                    )}
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Post Review</DialogTitle>
                        <DialogContent>
                            <Rating
                                name="rating"
                                precision={0.5}
                                value={newComment.rating}
                                onChange={(event, newValue) => {
                                    setNewComment({ ...newComment, rating: newValue });
                                }}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="comment"
                                label="Comment"
                                type="text"
                                fullWidth
                                value={newComment.comment}
                                onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
                                inputProps={{ style: { color: 'white' } }}
                                InputLabelProps={{ style: { color: 'white' } }}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary" variant='outlined'>
                                Cancel
                            </Button>
                            <Button onClick={handlePostComment} color="primary" variant='outlined'>
                                Post Review
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <div className="movie-info-right p-3 rounded-3">
                    {movie_genres && movie_genres.length > 0 && (
                        <div className="movie-genres">
                            <h3>Genres</h3>
                            <div className="genres">
                                {movie_genres.map((genre, index) => (
                                    <span key={index} className="genre">{genre}</span>
                                ))}
                            </div>
                        </div>
                    )}
                    {budget !== undefined && (
                        <div className="movie-budget">
                            <h3>Budget</h3>
                            <p>${budget.toLocaleString()}</p>
                        </div>
                    )}
                    {revenue !== undefined && (
                        <div className="movie-revenue">
                            <h3>Revenue</h3>
                            <p>${revenue.toLocaleString()}</p>
                        </div>
                    )}
                    {movie_keywords && movie_keywords.length > 0 && (
                        <div className="movie-keywords">
                            <h3>Keywords</h3>
                            <div className="keywords">
                                {movie_keywords.map((keyword, index) => (
                                    <span key={index} className="keyword">{keyword}</span>
                                ))}
                            </div>
                        </div>
                    )}
                    {homepage && (
                        <div className="movie-homepage">
                            <h3>Homepage</h3>
                            <a href={homepage} target="_blank" rel="noopener noreferrer">{homepage}</a>
                        </div>
                    )}
                </div>
            </div>
            {currentUser && currentUser.userType === 'admin' && (
                <div className="admin-controls">
                    {currentMovie.availability_status ? (
                        <Button variant="contained" color="error" onClick={deleteMovie} startIcon={<MdDelete />}>
                            Delete Movie
                        </Button>
                    ) : (
                        <Button variant="contained" color="primary" onClick={restoreMovie} startIcon={<MdRestore />}>
                            Restore Movie
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}

export default Movie;
