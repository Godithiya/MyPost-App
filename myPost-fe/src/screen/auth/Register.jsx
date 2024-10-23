import axios from 'axios'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {

  const authRegister = async (data) => {
    try {
      const result = await axios.post('http://localhost:3888/api/register', data)
      console.info(result)
    } catch (error) {
      console.error(error)
    }
  }

  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    navigate('/')

    let name = e.target.name.value
    let email = e.target.email.value
    let password = e.target.password.value
    let rePassword = e.target.rePassword.value

    if(password !== rePassword) return alert('password dan harus sama broo !!!')

    if(!email || !password || !rePassword || !name) return alert("form harus diisi semua guys")

    const dataRegistr = { name, email, password }
    authRegister(dataRegistr)
  }

  return (
    <div className='w-screen h-screen bg-[#BDE0FE] flex flex-col items-center justify-center'>
      <div className='w-[80%] bg-white h-auto shadow-2xl mt-5 rounded-lg pb-6'>
        <h1 className='mt-10 text-center font-bold text-xl mb-5 text-[#9ec8ec]'>Register Page</h1>
        <form className='px-5 flex flex-col gap-2' onSubmit={handleSubmit}>
          <span className='flex flex-col gap-1 mt-2'>
            <label htmlFor="name" className='text-[#7a9dbd]'>Name :</label>
            <input 
              className='border py-2 rounded-md px-2 focus:outline-none focus:ring-2' 
              id='name' type="text" placeholder=' masukan name' />
          </span>
          <span className='flex flex-col gap-1 mt-2'>
            <label htmlFor="email" className='text-[#7a9dbd]'>Email :</label>
            <input 
              className='border py-2 rounded-md px-2 focus:outline-none focus:ring-2' 
              id='email' type="email" placeholder=' masukan email' />
          </span>
          <span className='flex flex-col gap-1 mt-2'>
            <label htmlFor="password" className='text-[#7a9dbd]'>Password :</label>
            <input 
              className='border py-2 rounded-md px-2 focus:outline-none focus:ring-2' 
              id='password' type="password" placeholder=' masukan password' />
          </span>
          <span className='flex flex-col gap-1 mt-2'>
            <label htmlFor="rePassword" className='text-[#7a9dbd]'>RePassword :</label>
            <input 
              className='border py-2 rounded-md px-2 focus:outline-none focus:ring-2' 
              type="password" id='rePassword' placeholder=' masukan Re Password' />
          </span>
          <button className='bg-[#9ec8ec] text-white px-5 py-2 mt-4 rounded-md'>
            <span className='drop-shadow-2xl'>Submit</span>
          </button>
          <p className='text-[10px] text-end -mt-0'>Sudah punya Akun? // silahkan <Link to={'/'} className='text-[#7a9dbd]'>Login</Link> page</p>
        </form>
      </div>
    </div>
  )
}

export default Register
