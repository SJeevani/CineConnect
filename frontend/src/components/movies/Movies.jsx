import React, { useEffect, useState } from 'react';
import { axiosWithToken } from '../../axiosWithToken.jsx';
import './Movies.css'
import Pagination from '@mui/material/Pagination';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import noMovies from '../../images/noMovies.jpg'

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const MOVIES_PER_PAGE = 24;

function Movies() {
  let navigate = useNavigate();
  const [sortedMovies, setSortedMovies] = useState([]);
  const [sortOption, setSortOption] = useState('movies-new');
  const [currentPage, setCurrentPage] = useState(1);
  let { currentUser } = useSelector(state => state.userAdminLoginReducer)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axiosWithToken.get(`http://localhost:4000/${currentUser.userType}-api/${sortOption}`);
        setSortedMovies(response.data.payload);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [sortOption, currentUser.userType]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const readMovieByMovieId = (movieObj) => {
    navigate(`../${currentUser.userType}-profile/movie/${movieObj.id}`, { state: movieObj })
  }

  const totalPages = Math.ceil(sortedMovies.length / MOVIES_PER_PAGE);
  const startIndex = (currentPage - 1) * MOVIES_PER_PAGE;
  const endIndex = startIndex + MOVIES_PER_PAGE;
  const moviesToShow = sortedMovies.slice(startIndex, endIndex);

  return (
    <div>
      <div className="movies-container">
        <h1 className='mt-5 text-center fw-bold'>Movies Collection</h1>
        <div className='text-center d-block mx-auto mt-3'>
          <label htmlFor="sortOptions">Sort By : </label>
          <select
            id="sortOptions"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="movies-new">Latest to Oldest</option>
            <option value="movies-old">Oldest to Latest</option>
            <option value="popular">Popularity-Descending</option>
            <option value="moviesort">Title (A-Z)</option>
            <option value="moviesortreverse">Title (Z-A)</option>
          </select>
        </div>
        {moviesToShow.length > 0 ? (
          <>
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
          </>) : (
          <div className="no-movies-container">
            <p>No Movies</p>
            <img src={noMovies} alt="" className="no-movies-image" />
          </div>
        )}
      </div>
      <Outlet />
    </div>

  );
}

export default Movies;






// import React, { useEffect, useState } from 'react';
// import { axiosWithToken } from '../../axiosWithToken.jsx';
// import './Movies.css'
// import Pagination from '@mui/material/Pagination';
// import { useSelector } from 'react-redux';
// import { NavLink, useNavigate, Outlet } from "react-router-dom";
// import noMovies from '../../images/noMovies.jpg'

// const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
// const MOVIES_PER_PAGE = 24;

// function Movies() {
//   let navigate = useNavigate();
//   const [sortedMovies, setSortedMovies] = useState([]);
//   const [sortOption, setSortOption] = useState('movies-new');
//   const [currentPage, setCurrentPage] = useState(1);
//   let { currentUser } = useSelector(state => state.userAdminLoginReducer)

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const response = await axiosWithToken.get(`http://localhost:4000/${currentUser.userType}-api/${sortOption}`);
//         if (response.data && response.data.payload) {
//           setSortedMovies(response.data.payload);
//         } else {
//           setSortedMovies([]);
//         }
//       } catch (error) {
//         console.error('Error fetching movies:', error);
//         setSortedMovies([]);
//       }
//     };

//     if (currentUser.userType) {
//       fetchMovies();
//     }
//   }, [sortOption, currentUser.userType]);

//   const handleSortChange = (e) => {
//     setSortOption(e.target.value);
//     setCurrentPage(1);
//   };

//   const handlePageChange = (event, value) => {
//     setCurrentPage(value);
//   };

//   const readMovieByMovieId = (movieObj) => {
//     navigate(`../${currentUser.userType}-profile/movie/${movieObj.id}`, { state: movieObj });
//   }

//   const totalPages = Math.ceil(sortedMovies.length / MOVIES_PER_PAGE);
//   const startIndex = (currentPage - 1) * MOVIES_PER_PAGE;
//   const endIndex = startIndex + MOVIES_PER_PAGE;
//   const moviesToShow = Array.isArray(sortedMovies) ? sortedMovies.slice(startIndex, endIndex) : [];

//   return (
//     <div>
//       <div className="movies-container">
//         <h1 className='mt-5 text-center fw-bold'>Movies Collection</h1>
//         <div className='text-center d-block mx-auto mt-3'>
//           <label htmlFor="sortOptions">Sort By : </label>
//           <select
//             id="sortOptions"
//             value={sortOption}
//             onChange={handleSortChange}
//           >
//             <option value="movies-new">Latest to Oldest</option>
//             <option value="movies-old">Oldest to Latest</option>
//             <option value="popular">Popularity-Descending</option>
//             <option value="moviesort">Title (A-Z)</option>
//             <option value="moviesortreverse">Title (Z-A)</option>
//           </select>
//         </div>
//         {moviesToShow.length > 0 ? (
//           <>
//             <div className="movie-cards">
//               {moviesToShow.map((movie) => (
//                 <div key={movie.id} className="card" onClick={() => readMovieByMovieId(movie)}>
//                   <img
//                     src={`${BASE_IMAGE_URL}${movie.poster_path}`}
//                     alt={movie.title}
//                     className="card-img"
//                   />
//                   <div className="card-content bg-dark">
//                     <h2>{movie.title.length > 25 ? movie.title.substring(0, 25) + "..." : movie.title}</h2>
//                     <p><strong>Release Date:</strong> {movie.release_date}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className="pagination">
//               <Pagination
//                 count={totalPages}
//                 page={currentPage}
//                 onChange={handlePageChange}
//                 showFirstButton
//                 showLastButton
//                 size="large"
//                 siblingCount={2}
//               />
//             </div>
//           </>) : (
//           <div className="no-movies-container">
//             <p>No Movies</p>
//             <img src={noMovies} alt="" className="no-movies-image" />
//           </div>
//         )}
//       </div>
//       <Outlet />
//     </div>
//   );
// }

// export default Movies;
