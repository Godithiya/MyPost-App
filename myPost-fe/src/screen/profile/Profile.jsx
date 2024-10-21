import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import genereteToken from '../../token/GenereteToken'
import axios from 'axios'

const Profile = ({ onLogOut }) => {
  const navigate = useNavigate()

  const handleLogOut = () => {
    navigate('/')
    sessionStorage.removeItem('token')
    onLogOut()
  }

  const getUserByAuth = async () => {
    try {
      const token = genereteToken()
      const result = await axios.get('http://localhost:3888/api/getUser', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })

      console.info(result.data)
      return result.data
    } catch (error) {
      console.error(error)
      throw new Error('Failed to fetch user data')
    }
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ['getUserByAuth'],
    queryFn: getUserByAuth
  })

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">
             <p className="text-xl text-gray-600">Loading...</p>
           </div>
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen">
             <p className="text-xl text-red-600">Failed to load user data. Please try again.</p>
           </div>
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-10/12">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Profile</h1>
        <div className="mb-6">
          <p className="text-lg font-medium text-gray-700">Name: <span className="font-normal">{data?.response.name}</span></p>
          <p className="text-lg font-medium text-gray-700">Email: <span className="font-normal">{data?.response.email}</span></p>
        </div>
        <button
          className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
          onClick={handleLogOut}
        >
          Log Out
        </button>
      </div>
    </div>
  )
}

export default Profile
