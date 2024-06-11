import React, { useEffect, useState } from 'react';
import { axiosWithToken } from '../../axiosWithToken.jsx';
import './MovieByGenre.css';
import Pagination from '@mui/material/Pagination';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from "react-router-dom";

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const MOVIES_PER_PAGE = 24;

function MovieByGenre() {
  let navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { currentUser } = useSelector(state => state.userAdminLoginReducer);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axiosWithToken.get(`http://localhost:4000/${currentUser.userType}-api/genres`);
        setAllGenres(response.data.payload);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, [currentUser.userType]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let response;
        if (selectedGenres.length === 0) {
          response = await axiosWithToken.get(`http://localhost:4000/${currentUser.userType}-api/movies-new`);
        } else {
          response = await axiosWithToken.post(`http://localhost:4000/${currentUser.userType}-api/movies-genre`, { genres: selectedGenres });
        }
        setMovies(response.data.payload);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [currentUser.userType, selectedGenres]);

  const handleGenreChange = (genre) => {
    const updatedGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter(selectedGenre => selectedGenre !== genre)
      : [...selectedGenres, genre];

    setSelectedGenres(updatedGenres);
    setCurrentPage(1); // Reset page to 1 when changing genres
  };

  const handleAllGenresClick = () => {
    setSelectedGenres([]);
    setCurrentPage(1); // Reset page to 1 when selecting all genres
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const readMovieByMovieId = (movieObj) => {
    navigate(`../${currentUser.userType}-profile/movie/${movieObj.id}`, { state: movieObj })
  }

  const totalPages = Math.ceil(movies.length / MOVIES_PER_PAGE);
  const startIndex = (currentPage - 1) * MOVIES_PER_PAGE;
  const endIndex = startIndex + MOVIES_PER_PAGE;
  const moviesToShow = movies.slice(startIndex, endIndex);

  return (
    <div className="movie-by-genre-container">
      <h1 className='mt-5 text-center fw-bold'>Movies by Genre</h1>
      <div className="moviegenres">
        <button className={`genre-button ${selectedGenres.length === 0 ? 'selected' : ''}`} onClick={handleAllGenresClick}>All Genres</button>
        {allGenres.map(genre => (
          <button
            key={genre}
            className={`genre-button ${selectedGenres.includes(genre) ? 'selected' : ''}`}
            onClick={() => handleGenreChange(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
      <div className="movie-cards">
        {moviesToShow.map((movie) => (
          <div key={movie.id} className="card" onClick={() => readMovieByMovieId(movie)}>
            <img
              src={`${BASE_IMAGE_URL}${movie.poster_path}`}
              alt={movie.title}
              className="card-img"
            />
            <div className="card-content bg-dark">
              <h2>{movie.title.length > 25 ? movie.title.substring(0, 25) + "..." : movie.title}</h2>
              <p><strong>Release Date:</strong> {movie.release_date}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          showFirstButton
          showLastButton
          size="large"
          siblingCount={2}
        />
      </div>
    </div>
  );
}

export default MovieByGenre;
