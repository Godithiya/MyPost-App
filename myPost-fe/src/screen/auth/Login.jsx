import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'

const Login = ({onLogin}) => {

    const hanldeSubmit= (e) => {
        e.preventDefault()

        let email = e.target.email.value
        let password = e.target.password.value

        let dataLogin = {email, password}

        login(dataLogin)
    }

    const login = async (data) => {
        try {   
            const result = await axios.post('http://localhost:3888/api/login', data);
            console.info(result.data); 
            sessionStorage.setItem('token',result.data)
            onLogin()   
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
            if(error) {
                alert('error broo')
            }
        }
    }
    

console.info(hanldeSubmit)

  return (
    <div className='w-screen h-screen bg-[#BDE0FE] flex flex-col items-center justify-center  ' >
        <div className='w-[80%] bg-white h-[390px] shadow-2xl mt-5 rounded-lg  ' >
        <h1 className='mt-10 text-center font-bold text-xl mb-5 text-[#9ec8ec] ' >Login Page</h1> 
            <form className='px-5 flex flex-col gap-5 ' onSubmit={hanldeSubmit} >
                <span className='flex flex-col gap-1 mt-5 ' >
                    <label htmlFor="email" className='text-[#7a9dbd]'>Email</label>
                    <input className='border py-2 rounded-md px-2 focus:outline-none focus:ring-2' id='email' type="email" placeholder=' masukan email' />
                </span>
                <span className='flex flex-col gap-1 mt-2' >
                    <label htmlFor="password" className='text-[#7a9dbd]'>Password</label>
                    <input className='border py-2 rounded-md px-2 focus:outline-none focus:ring-2' id='password' type="password" placeholder=' masukan password' />
                </span>
                <button className='bg-[#9ec8ec]  text-white px-5 py-2 mt-3 rounded-md ' type='submit' ><span className='drop-shadow-2xl'>Login</span></button>
                <p className='text-[10px] text-end -mt-4' >Belum punya Akun ? // silahkan <Link to={'/register'} className='text-[#7a9dbd]' >Register</Link> page </p>
            </form>
        </div>
    </div>
  )
}

export default Login