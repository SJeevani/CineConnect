import React, { useEffect, useState } from 'react';
import { axiosWithToken } from '../../axiosWithToken.jsx';
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [moviesCount, setMoviesCount] = useState({ totalMovies: 0, availableMovies: 0, unavailableMovies: 0 });
  const [moviesPerGenre, setMoviesPerGenre] = useState([]);
  const [moviesPerYear, setMoviesPerYear] = useState([]);
  const [moviesPerBudget, setMoviesPerBudget] = useState([]);
  const [moviesPopularity, setMoviesPopularity] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userCountResponse = await axiosWithToken.get('http://localhost:4000/admin-api/users-count');
      setUserCount(userCountResponse.data.payload);

      const moviesCountResponse = await axiosWithToken.get('http://localhost:4000/admin-api/movies-count');
      setMoviesCount(moviesCountResponse.data.payload);

      const moviesPerGenreResponse = await axiosWithToken.get('http://localhost:4000/admin-api/movies-per-genre');
      setMoviesPerGenre(moviesPerGenreResponse.data.payload);

      const moviesPerYearResponse = await axiosWithToken.get('http://localhost:4000/admin-api/movies-per-year');
      setMoviesPerYear(moviesPerYearResponse.data.payload);

      const moviesPerBudgetResponse = await axiosWithToken.get('http://localhost:4000/admin-api/movies-per-budget');
      setMoviesPerBudget(moviesPerBudgetResponse.data.payload);

      const moviesPopularityResponse = await axiosWithToken.get('http://localhost:4000/admin-api/movies-popularity');
      setMoviesPopularity(moviesPopularityResponse.data.payload);
    };

    fetchData();
  }, []);

  const genreData = {
    labels: moviesPerGenre.map(g => g.genre),
    datasets: [{
      label: 'Number of Movies',
      data: moviesPerGenre.map(g => g.count),
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 1,
    }],
  };

  const yearData = {
    labels: moviesPerYear.map(y => y.year),
    datasets: [{
      label: 'Number of Movies',
      data: moviesPerYear.map(y => y.count),
      backgroundColor: 'rgba(153,102,255,0.4)',
      borderColor: 'rgba(153,102,255,1)',
      borderWidth: 1,
    }],
  };

  const budgetData = {
    labels: moviesPerBudget.map(b => b.range),
    datasets: [{
      label: 'Number of Movies',
      data: moviesPerBudget.map(b => b.count),
      backgroundColor: 'rgba(255,159,64,0.4)',
      borderColor: 'rgba(255,159,64,1)',
      borderWidth: 1,
    }],
  };


  const popularityData = {
    labels: moviesPopularity.map(p => p.range),
    datasets: [{
      label: 'Number of Movies',
      data: moviesPopularity.map(p => p.count),
      backgroundColor: 'rgb(178,86,162,0.4)',
      borderColor: 'rgba(178,86,162,1)',
      borderWidth: 1,
    }],
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-card">
        <h3>Total Users</h3>
        <p>{userCount}</p>
      </div>
      <div className="admin-card">
        <h3>Total Movies</h3>
        <h5 className='fw-bold'>{moviesCount.totalMovies}</h5>
        <p className='fs-5 fw-normal'>Available: {moviesCount.availableMovies}</p>
        <p className='fs-5 fw-normal'>Unavailable: {moviesCount.unavailableMovies}</p>
      </div>
      <div className="chart-container">
        <h3>Movies per Genre</h3>
        <Bar data={genreData} />
      </div>
      <div className="chart-container">
        <h3>Movies per Release Year</h3>
        <Line data={yearData} />
      </div>
      <div className="chart-container">
        <h3>Movies per Budget Range</h3>
        <Line data={budgetData} />
      </div>
      <div className="chart-container">
        <h3>Movies Popularity</h3>
        <Bar data={popularityData} />
      </div>
    </div>
  );
};

export default AdminDashboard;
