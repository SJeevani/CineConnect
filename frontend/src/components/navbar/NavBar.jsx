import React from 'react';
import '../navbar/NavBar.css';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetState } from '../../redux/slices/UserAdminSlice';
import logo from '../../images/logo.png';
import { FaHome } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";

function NavBar() {
  const { loginUserStatus, currentUser } = useSelector(state => state.userAdminLoginReducer);
  const dispatch = useDispatch();

  function logOut() {
    // remove token from local storage
    localStorage.removeItem('token');
    dispatch(resetState());
  }

  return (
    <div>
      <nav className='navbar d-flex justify-content-between align-items-center'>
        <ul className='nav fw-semibold justify-content-start align-items-center'>
          <li className='nav-item'>
            <NavLink to='/home' className='navbar-brand'>
              <img src={logo} alt='' className='mx-3' />
            </NavLink>
          </li>
          <li className='nav-item name'>
            <h2 className='fw-bold'>CineConnect</h2>
          </li>
        </ul>
        <ul className='nav fs-4 fw-semibold justify-content-end align-items-center'>
          {loginUserStatus === false ? (
            <>
              <li className='nav-item'>
                <NavLink className='text-light nav-link' to='/home'>
                  <FaHome className='mb-1' />Home
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='text-light nav-link' to='/signup'>
                  Sign Up
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='text-light nav-link' to='/signin'>
                  Sign In
                </NavLink>
              </li>
            </>)
            :
            (<>
              <li className='nav-item dropdown'>
                <span className='welcome_msg fs-3 mt-3 mx-2 fw-bold dropdown-toggle' data-bs-toggle='dropdown'>
                  Welcome {currentUser.username} {currentUser.userType === 'admin' && <sup>({currentUser.userType})</sup>}
                </span>
                <ul className='dropdown-menu'>
                  {currentUser.userType === 'admin' && (
                    <>
                      <li><NavLink className='dropdown-item' to='/admin-profile/movies'>Movies Collection</NavLink></li>
                      <li><NavLink className='dropdown-item' to='/admin-profile/movies-by-genre'>Movies by Genre</NavLink></li>
                      <li><NavLink className='dropdown-item' to='/admin-profile/trending'>Top 100 Movies</NavLink></li>
                      <li><NavLink className='dropdown-item' to='/admin-profile/deleted-movies'>Deleted Movies</NavLink></li>
                      <li><NavLink className='dropdown-item' to='/admin-dashboard'>Admin Dashboard</NavLink></li>
                    </>
                  )}
                  {currentUser.userType === 'user' && (
                    <>
                      <li><NavLink className='dropdown-item' to='/user-profile/movies'>Movies Collection</NavLink></li>
                      <li><NavLink className='dropdown-item' to='/user-profile/movies-by-genre'>Movies by Genre</NavLink></li>
                      <li><NavLink className='dropdown-item' to='/user-profile/trending'>Top 100 Movies</NavLink></li>
                      <li><NavLink className='dropdown-item' to='/user-profile/favorites'>Favorite Movies</NavLink></li>
                    </>
                  )}
                </ul>
              </li>
              <li className='nav-item'>
                <NavLink className='fs-4 text-light nav-link' to='/home' onClick={logOut}>
                  <TbLogout className='mb-1' />
                  Logout
                </NavLink>
              </li>
            </>)
          }
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;






// import React from 'react';
// import './NavBar.css';
// import { NavLink } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { resetState } from '../../redux/slices/UserAdminSlice';
// import logo from '../../images/logo.png';
// import { FaHome } from "react-icons/fa";
// import { TbLogout } from "react-icons/tb";

// function NavBar() {
//   const { loginUserStatus, currentUser } = useSelector(state => state.userAdminLoginReducer);
//   const dispatch = useDispatch();

//   function logOut() {
//     // remove token from local storage
//     localStorage.removeItem('token');
//     dispatch(resetState());
//   }

//   return (
//     <div>
//       <nav className='navbar d-flex justify-content-between align-items-center'>
//         <ul className='nav fw-semibold justify-content-start align-items-center'>
//           <li className='nav-item'>
//             <NavLink to='/home' className='navbar-brand'>
//               <img src={logo} alt='' className='mx-3' />
//             </NavLink>
//           </li>
//           <li className='nav-item name'>
//             <h2 className='fw-bold'>CineConnect</h2>
//           </li>
//         </ul>
//         <ul className='nav fs-4 fw-semibold justify-content-end align-items-center'>
//           {loginUserStatus === false ? (
//             <>
//               <li className='nav-item'>
//                 <NavLink className='text-light nav-link' to='/home'>
//                   <FaHome className='mb-1' />Home
//                 </NavLink>
//               </li>
//               <li className='nav-item'>
//                 <NavLink className='text-light nav-link' to='/signup'>
//                   Sign Up
//                 </NavLink>
//               </li>
//               <li className='nav-item'>
//                 <NavLink className='text-light nav-link' to='/signin'>
//                   Sign In
//                 </NavLink>
//               </li>
//             </>)
//             :
//             (<>
//               <li className='nav-item dropdown'>
//                 <span className='welcome_msg fs-3 mt-3 mx-2 fw-bold dropdown-toggle' data-bs-toggle='dropdown'>
//                   Welcome {currentUser.username} {currentUser.userType === 'admin' && <sup>({currentUser.userType})</sup>}
//                 </span>
//                 <ul className='dropdown-menu'>
//                   {currentUser.userType === 'admin' && (
//                     <>
//                       <li><NavLink className='dropdown-item' to='/admin-profile/movies'>Movies Collection</NavLink></li>
//                       <li><NavLink className='dropdown-item' to='/admin-profile/movies-by-genre'>Movies by Genre</NavLink></li>
//                       <li><NavLink className='dropdown-item' to='/admin-profile/trending'>Top 100 Movies</NavLink></li>
//                       <li><NavLink className='dropdown-item' to='/admin-profile/deleted-movies'>Deleted Movies</NavLink></li>
//                       <li><NavLink className='dropdown-item' to='/admin-dashboard'>Admin Dashboard</NavLink></li>
//                     </>
//                   )}
//                   {currentUser.userType === 'user' && (
//                     <>
//                       <li><NavLink className='dropdown-item' to='/user-profile/movies'>Movies Collection</NavLink></li>
//                       <li><NavLink className='dropdown-item' to='/user-profile/movies-by-genre'>Movies by Genre</NavLink></li>
//                       <li><NavLink className='dropdown-item' to='/user-profile/trending'>Top 100 Movies</NavLink></li>
//                       <li><NavLink className='dropdown-item' to='/user-profile/favorites'>Favorite Movies</NavLink></li>
//                     </>
//                   )}
//                 </ul>
//               </li>
//               <li className='nav-item'>
//                 <NavLink className='fs-4 text-light nav-link' to='/home' onClick={logOut}>
//                   <TbLogout className='mb-1' />
//                   Logout
//                 </NavLink>
//               </li>
//             </>)
//           }
//         </ul>
//       </nav>
//     </div>
//   );
// }

// export default NavBar;
