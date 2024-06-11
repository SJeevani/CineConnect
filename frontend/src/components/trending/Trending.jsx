import React, { useEffect, useState } from 'react';
import { axiosWithToken } from '../../axiosWithToken.jsx';
import './Trending.css'
import Pagination from '@mui/material/Pagination';
import { useSelector } from 'react-redux';
import { useNavigate} from "react-router-dom";

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const MOVIES_PER_PAGE = 20;

function Trending() {
    let navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [movies, setMovies] = useState([]);
    let { currentUser } = useSelector(state => state.userAdminLoginReducer)

    useEffect(() => {
        const fetchMovies = async () => {
          try {
            const response = await axiosWithToken.get(`http://localhost:4000/${currentUser.userType}-api/trending`);
            setMovies(response.data.payload);
          } catch (error) {
            console.error('Error fetching movies:', error);
          }
        };
    
        fetchMovies();
      }, currentUser.userType);

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
    <div className="movies-container">
      <h1 className='mt-5 text-center fw-bold'>Top 100 Movies by Popularity</h1>
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
              <p><strong>Release Date :</strong> {movie.release_date}</p>
              <p><strong>Popularity : </strong>{movie.popularity}</p>
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
  )
}

export default Trending