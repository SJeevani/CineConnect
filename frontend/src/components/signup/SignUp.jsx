import React, { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import './SignUp.css'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import google from '../../images/google.png'

function SignUp() {

  let { register, handleSubmit, formState: { errors } } = useForm()
  let [err, setErr] = useState('')
  let navigate = useNavigate()

  async function onRegisterFormSubmit(newUser) {
    let res = await axios.post('http://localhost:4000/user-api/user', newUser)
    console.log(res)
    if (res.data.message === 'New user created') {
      // navigate to login
      navigate('/signin')
    } else {
      setErr(res.data.message)
    }
    console.log(newUser)

  }
  console.log(err)


  return (
    <div className='sign-up'>
      <div className="container in mt-3 mb-3">
        <div className="main">
          <div className="child1" id="registerForm">
            <h1>Sign Up</h1>
            <div className="column">
              <div className="img1"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Facebook_icon_%28black%29.svg/1024px-Facebook_icon_%28black%29.svg.png" alt="Facebook Logo" /></div>
              <div className="img2"><img src={google} alt="Google Logo" /></div>
              <div className="img3"><img src="https://i.pinimg.com/originals/60/fa/2b/60fa2b2181c40ac12302e6fdbc418512.jpg" alt="Twitter Logo" /></div>
            </div>
            <h3>Create a new account</h3>
            {err.length !== 0 && <div className='alert alert-danger w-100 fw-bold text-center p-1 fs-5' role='alert'>{err}</div>}
            <form onSubmit={handleSubmit(onRegisterFormSubmit)}>
              <div className="input">
                <label htmlFor="username" className="form-label"></label>
                <input type="text" {...register("username", { required: true })} id="username" className="form-control fs-5" placeholder='Username' />
                {errors.username?.type === 'required' && <h5 className='mx-2 mt-1 fw-semibold text-start text-danger'>Username is required</h5>}

                <label htmlFor="email" className="form-label"></label>
                <input type="email" {...register("email", { required: true })} id="email" className="form-control fs-5" placeholder='E-mail' />
                {errors.email?.type === 'required' && <h5 className='mx-2 mt-1 fw-semibold text-start text-danger'>Email is required</h5>}

                <label htmlFor="password" className="form-label"></label>
                <input type="password" {...register("password", { required: true })} id="password" className="form-control fs-5 " placeholder='Password' />
                {errors.password?.type === 'required' && <h5 className='mx-2 mt-1 fw-semibold text-start text-danger'>Password is required</h5>}
                <h3>Already have an account? <NavLink to="/signin" className='link'>Sign In here</NavLink></h3>
                <button className="boton-elegante">Sign Up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  )
}

export default SignUp