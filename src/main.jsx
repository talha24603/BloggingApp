import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider, useSelector} from 'react-redux'
import store from './redux/store.js'
import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import AddPost from './components/AddPost.jsx'
import SignUp from './components/SignUp.jsx'
import Post from './components/Post.jsx'
import EditPost from './components/EditPost.jsx'
import Profile from './components/Profile.jsx'

const PrivateRouter=({children})=>{

  const authStatus=useSelector((state=>state.auth.status))
  return authStatus?children:(<Navigate to={'/login'}/>)
};
const UnAthenticated=({children})=>{
  const authStatus=useSelector((state)=>state.auth.status)
  return !authStatus?children:(<Navigate to={'/'}/>)
}
createRoot(document.getElementById('root')).render(
  

  <StrictMode>
     <Provider store={store}>
      <BrowserRouter>

      <Routes>
        <Route path="/" element={<App />}>
        
          <Route path="/" element={<Home/>} />,
          <Route path="/login" element={
            <UnAthenticated>
               <Login/>
            </UnAthenticated>
           
            } />,
          
          <Route path="/addpost" element={
            <PrivateRouter>
              <AddPost/>
            </PrivateRouter>
            } />,
          <Route path="/signup" element={
            <UnAthenticated>
            <SignUp/>
            </UnAthenticated>
            } />,
          <Route path="/post/:id" element={
            <PrivateRouter>
            <Post/>
            </PrivateRouter>
          } />,
          <Route path="/editpost/:id" element={
            <PrivateRouter>
              <EditPost/>
              </PrivateRouter>
            } />,
            <Route path="/profile/:id" element={
            <PrivateRouter>
              <Profile/>
              </PrivateRouter>
            } />
          </Route>

          

          
          

         
      </Routes>

    </BrowserRouter>
    </Provider>
  </StrictMode>,
  
)
