import React, { useEffect } from 'react'
import './SignIn.css'
import { useNavigate, NavLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import google from '../../images/google.png'
import { useDispatch, useSelector } from 'react-redux'
import { userAdminLoginThunk } from '../../redux/slices/UserAdminSlice'

function SignIn() {

  let { register, handleSubmit, formState: { errors } } = useForm();
  let dispatch = useDispatch()
  let { loginUserStatus, errorOccured, errMsg, currentUser } = useSelector(state => state.userAdminLoginReducer)
  let navigate = useNavigate()

  function onLoginFormSubmit(userCredentialsObject) {
    // console.log(userCredentialsObject);
    dispatch(userAdminLoginThunk(userCredentialsObject))
  }

  useEffect(() => {
    if (loginUserStatus === true) {
      if (currentUser.userType === 'user') {
        navigate('/user-profile/movies')
      }
      if (currentUser.userType === 'admin') {
        navigate('/admin-profile/movies')
      }
    }
  }, [loginUserStatus])

  return (
    <div className='sign-in'>
      <div className="container in mt-3 mb-3">
        <div className="main">
          <div className="child1" id="registerForm">
            <h1>Sign In </h1>
            <div className="column">
              <div className="img1"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Facebook_icon_%28black%29.svg/1024px-Facebook_icon_%28black%29.svg.png" alt="Facebook Logo" /></div>
              <div className="img2"><img src={google} alt="Google Logo" /></div>
              <div className="img3"><img src="https://i.pinimg.com/originals/60/fa/2b/60fa2b2181c40ac12302e6fdbc418512.jpg" alt="Twitter Logo" /></div>
            </div>
            <h3 className='mb-3'>Log In to your account</h3>
            {errMsg.length !== 0 && <div className='alert alert-danger w-100 fw-bold text-center p-1 fs-5' role='alert'>{errMsg}</div>}
            <form onSubmit={handleSubmit(onLoginFormSubmit)}>
              <div className="fw-medium radio">
                {errors.userType?.type === 'required' && (
                  <h5 className='mt-1 mx-2 fw-semibold text-start text-danger'>Please select a role</h5>
                )}
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    {...register("userType", { required: true })}
                    value="admin"
                  />
                  <label className="form-check-label role">Admin</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    {...register("userType", { required: true })}
                    value="user"
                  />
                  <label className="form-check-label role">User</label>
                </div>
                {/* {errors.userType?.type === 'required' && (
                  <h5 className='mt-1 mx-2 fw-semibold text-start text-danger'>Please select a role</h5>
                )} */}
              </div>
              <div className="input">
                <label htmlFor="username" className="form-label"></label>
                <input type="text" {...register("username", { required: true })} id="username" className="form-control fs-5" placeholder='Username' />
                {errors.username?.type === 'required' && <h5 className='mx-2 mt-1 fw-semibold text-start text-danger'>Username is required</h5>}

                <label htmlFor="password" className="form-label"></label>
                <input type="password" {...register("password", { required: true })} id="password" className="form-control fs-5 " placeholder='Password' />
                {errors.password?.type === 'required' && <h5 className='mx-2 mt-1 fw-semibold text-start text-danger'>Password is required</h5>}
                <h3>New User ?? <NavLink to="/signup" className='link'>Sign Up here</NavLink></h3>
                <button className="boton-elegante">Sign In</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn