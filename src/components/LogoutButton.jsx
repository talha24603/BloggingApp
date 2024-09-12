import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/authSlice'
import authServices from '../appWrite/authAppwrite'

const LogoutButton = () => {
  const dispatch = useDispatch()

  const handleLogout = async () => {
    const userLogout = await authServices.logout()
    if (userLogout) {

      dispatch(logout())
    }
  }
  return (
    <button className="py-2  font-semibold text-black rounded-lg bg-opacity-0 hover:text-indigo-600 cursor-pointer transition-all duration-200"
      onClick={handleLogout}>Logout</button>
  )
}

export default LogoutButton