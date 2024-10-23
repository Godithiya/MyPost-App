import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import genereteToken from '../../token/GenereteToken'
import { FiArrowDownCircle, FiArrowUpCircle } from 'react-icons/fi'


const Home = () => {
  const [ openForm, setOpenForm ] = useState(false)

  const { data, isLoading, refetch } = useQuery({
    queryKey : ['getAllPost'],
    queryFn : async () => {
      try {
        const result = await axios.get(`http://localhost:3888/api/post/getAll`)

        console.log(result.data.data)
        return result.data.data
      } catch (error) {
        console.log(error)
      }
    }
  })

  function handleSubmit(e) {
    e.preventDefault()

    let token = genereteToken()
    let judul = e.target.judul.value;
    let body = e.target.body.value;

    axios.post(`http://localhost:3888/api/post/create`, {judul, body}, {
      headers : {
        authorization : `Bearer ${token}`
      }
    }).then(res => {
      console.log(res)
      refetch()
      e.target.reset()
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <main className='w-full min-h-screen py-2 px-4 bg-gray-100 '>
      {/* form create post */}
      <div className="w-full h-auto px-4 pb-4 bg-gray-200 drop-shadow-lg rounded-lg sticky top-1 transition-all">
        <button onClick={()=>setOpenForm(prev => !prev)}>
          {
            openForm ? <FiArrowDownCircle className='h-4 w-4 absolute right-3 top-2 text-[#7a9dbd] duration-300' /> : <FiArrowUpCircle className='h-5 w-5 absolute right-3 top-2 text-[#7a9dbd] duration-300' />
          }
        </button>
       <h1 className='text-center font-semibold tracking-widest uppercase text-[#7a9dbd] select-none'>Create New Post</h1>
       <div className={`${openForm ? "block" : "hidden"}`} >
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <input type="text" id='judul' className='border-2 border-[#7a9dbd] p-2 rounded-lg outline-none focus:ring-2 focus:border-none ring-sky-500' placeholder='masukan judul postingan' />
          </div>
          <div className="mt-2">
            <textarea name="body" id="body" className='w-full h-20 border-2 border-[#7a9dbd] p-2 rounded-lg outline-none focus:ring-2 focus:border-none ring-sky-500' placeholder='masukan isi postingan'></textarea>
          </div>
          <button className='w-full mt-2 py-2 bg-[#719dbd] text-neutral-100 hover:bg-sky-500 rounded-lg duration-300' type='submit'>Kirim</button>
        </form>
       </div>
      </div>

      <div className="w-full min-h-screen px-4">
      {
        data?.map((e)=>(
          <div className="w-full h-auto py-2 px-3 bg-white shadow-lg rounded-lg mt-4 group-[hover:text-sky-500] select-none" key={e.id}>
            <h1 className="font-semibold text-lg text-[#7a9dbd] group">{e.judul}</h1>
            <p className="mb-2 text-neutral-700 group text-sm">{e.body}</p>
            <div className="flex justify-between">
              <small className='text-[#7a9dbd] group'>{e.author}</small>
              <small className='text-[#7a9dbd] group'>{e.createAt}</small>
            </div>
          </div>
        ))
      }
      </div>
    </main>
  )
}

export default Home