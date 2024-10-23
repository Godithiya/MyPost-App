import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { FaEllipsisV } from "react-icons/fa"
import genereteToken from '../../token/GenereteToken'
import axios from 'axios'

const MyPost = () => { 
    const [isModalOpen, setIsModalOpen] = useState(false)
    const {data, isLoading, refetch } = useQuery({
      queryKey : ['getPostByAuth'],
      queryFn : async () => {
        try {
          const token = genereteToken()
          const result = await axios.get(`http://localhost:3888/api/post/postByAuth`, {
            headers : {
              authorization : `Bearer ${token}`
            }
          })
          console.log(result.data.response)
          return result.data.response
        } catch (error) {
          console.log(error)
        }
      }
    })

    function handleOpenModal(id){
      setIsModalOpen(prev => (prev === id ? null : id))
    }

    function handleDeletePost(){

    }
  return (
    <main className='w-full min-h-screen bg-gray-100 px-4 py-6 pb-20'>
       {
        data.map((e)=>(
          <div 
          className="w-full h-auto py-2 px-3 bg-white shadow-lg rounded-lg mt-4 group-[hover:text-sky-500] select-none relative" 
          >
            <h1 className="font-semibold text-lg text-[#7a9dbd] group">{e.judul}</h1>
            <p className="mb-2 text-neutral-700 group text-sm">{e.body}</p>
            <div className="flex justify-between">
              <small className='text-[#7a9dbd] group'>{e.author}</small>
              <small className='text-[#7a9dbd] group'>{e.createAt}</small>
            </div>
             <FaEllipsisV className='absolute top-2 right-2 fill-[#7a9dbd]' onClick={()=>handleOpenModal(e.id)} />

             <div className={`${isModalOpen === e.id ? "block" : "hidden"} transition-all ease-in-out duration-500 px-2 py-1 w-24 bg-slate-100 shadow-xl absolute top-7 right-2 rounded-lg text-[#6b8fb1] `}>
              <div className="h-8 px-2 py-1 flex items-center">
                <span>Edit</span>
              </div>
              <div className="h-8 px-2 py-1 flex items-center">
                <span>Delete</span>
              </div>
             </div>
        </div>
        ))
       }
    </main>
  )
}

export default MyPost
