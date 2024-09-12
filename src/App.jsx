import { useEffect, useState } from 'react'

import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import services from './appWrite/config'
import authServices from './appWrite/authAppwrite'
import { useDispatch } from 'react-redux'
import { login } from './redux/authSlice'

function App() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  useEffect(() => {

    const fetchUser = async () => {
      try {
        const user = await authServices.getCurrentUser()
        if (user) {
          dispatch(login(user))
        }
      } catch (error) {
        console.log(error);
      }
      finally {
        setLoading(false)
      }


    }
    fetchUser()
  }, [])
  return (
    <>
      {loading ? <div>loading....</div> : <>
        <Header />
        <main>
          <Outlet />
        </main>


        <Footer /></>}
    </>
  )
}

export default App
