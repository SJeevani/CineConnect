import React from 'react';
import './App.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import RouteLayout from './components/RouteLayout';
import ErrorPage from '../src/components/ErrorPage'
import Home from './components/home/Home'
import Resources from './components/resources/Resources';
import Blog from './components/blog/Blog';
import ContactUs from './components/contactUs/ContactUs';
import Support from './components/support/Support'
import About from './components/about/About';
import SignUp from './components/signup/SignUp'
import SignIn from './components/signin/SignIn'
import Movies from './components/movies/Movies';
import MovieByGenre from './components/moviesByGenre/MovieByGenre';
import Trending from './components/trending/Trending';
import Movie from './components/movie/Movie'
import DeletedMovies from './components/deletedMovies/DeletedMovies';
import FAQ from './components/faq/FAQ';
import FavoriteMovies from './components/favoriteMovies/FavoriteMovies';
import AdminDashboard from './components/admin-dashboard/AdminDashboard';

function App() {

  // create browser router object
  let router=createBrowserRouter([
    {
      path:'',
      element:<RouteLayout/>,
      errorElement:<ErrorPage/>,
      children:[
        {
          path:'',
          element:<Home/>
        },
        {
          path:'home',
          element:<Home/>
        },
        {
          path:'resources',
          element:<Resources/>
        },
        {
          path:'blog',
          element:<Blog/>
        },
        {
          path:'contact',
          element:<ContactUs/>
        },
        {
          path:'support',
          element:<Support/>
        },
        {
          path:'faq',
          element:<FAQ/>
        },
        {
          path:'about',
          element:<About/>
        },
        {
          path:'signup',
          element:<SignUp/>
        },
        {
          path:'signin',
          element:<SignIn/>
        },
        {
          path:'user-profile/movies',
          element:<Movies/>
        },
        {
          path:'admin-profile/movies',
          element:<Movies/>
        },
        {
          path:'user-profile/movies-by-genre',
          element:<MovieByGenre/>
        },
        {
          path:'admin-profile/movies-by-genre',
          element:<MovieByGenre/>
        },
        {
          path:'user-profile/trending',
          element:<Trending/>
        },
        {
          path:'admin-profile/trending',
          element:<Trending/>
        },
        {
          path:'user-profile/movie/:id',
          element:<Movie/>
        },
        {
          path:'admin-profile/movie/:id',
          element:<Movie/>
        },
        {
          path:'admin-profile/deleted-movies',
          element:<DeletedMovies/>
        },
        {
          path:'user-profile/favorites',
          element:<FavoriteMovies/>
        },
        {
          path:'admin-dashboard',
          element:<AdminDashboard/>
        }
      ]
    }
  ])

  return (
    <div>
      {/* provide browser routerobj to application */}
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;






// import React, { useEffect } from 'react';
// import './App.css'
// import { useDispatch } from 'react-redux';
// import { checkUser } from './redux/slices/UserAdminSlice';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import RouteLayout from './components/RouteLayout';
// import ErrorPage from './components/ErrorPage';
// import Home from './components/home/Home';
// import Resources from './components/resources/Resources';
// import Blog from './components/blog/Blog';
// import ContactUs from './components/contactUs/ContactUs';
// import Support from './components/support/Support';
// import About from './components/about/About';
// import SignUp from './components/signup/SignUp';
// import SignIn from './components/signin/SignIn';
// import Movies from './components/movies/Movies';
// import MovieByGenre from './components/moviesByGenre/MovieByGenre';
// import Trending from './components/trending/Trending';
// import Movie from './components/movie/Movie';
// import DeletedMovies from './components/deletedMovies/DeletedMovies';
// import FAQ from './components/faq/FAQ';
// import FavoriteMovies from './components/favoriteMovies/FavoriteMovies';
// import AdminDashboard from './components/admin-dashboard/AdminDashboard';

// function App() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(checkUser());
//   }, [dispatch]);

//   const router = createBrowserRouter([
//     {
//       path: '',
//       element: <RouteLayout />,
//       errorElement: <ErrorPage />,
//       children: [
//         { path: '', element: <Home /> },
//         { path: 'home', element: <Home /> },
//         { path: 'resources', element: <Resources /> },
//         { path: 'blog', element: <Blog /> },
//         { path: 'contact', element: <ContactUs /> },
//         { path: 'support', element: <Support /> },
//         { path: 'faq', element: <FAQ /> },
//         { path: 'about', element: <About /> },
//         { path: 'signup', element: <SignUp /> },
//         { path: 'signin', element: <SignIn /> },
//         { path: 'user-profile/movies', element: <Movies /> },
//         { path: 'admin-profile/movies', element: <Movies /> },
//         { path: 'user-profile/movies-by-genre', element: <MovieByGenre /> },
//         { path: 'admin-profile/movies-by-genre', element: <MovieByGenre /> },
//         { path: 'user-profile/trending', element: <Trending /> },
//         { path: 'admin-profile/trending', element: <Trending /> },
//         { path: 'user-profile/movie/:id', element: <Movie /> },
//         { path: 'admin-profile/movie/:id', element: <Movie /> },
//         { path: 'admin-profile/deleted-movies', element: <DeletedMovies /> },
//         { path: 'user-profile/favorites', element: <FavoriteMovies /> },
//         { path: 'admin-dashboard', element: <AdminDashboard /> },
//       ]
//     }
//   ]);

//   return (
//     <div>
//       <RouterProvider router={router} />
//     </div>
//   );
// }

// export default App;
