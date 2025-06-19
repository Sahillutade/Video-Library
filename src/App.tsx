import { HashRouter, Link, Route, Routes } from 'react-router-dom'
import { VideoHome } from './components/video-home'
import { UserLogin } from './components/user-login'
import { UserDash } from './components/user-dash'
import { RegisterUser } from './components/register-user'
import { AdminLogin } from './components/admin-login'
import { AdminEditVideo } from './components/admin-edit-video'
import { AdminDeleteVideo } from './components/admin-delete-video'
import { AdminDash } from './components/admin-dash'
import { AdminAddVideo } from './components/admin-add-video'

function App() {

  return (
    <div className='container-fluid'>
      <HashRouter>
        <header>
          <h2 className='text-center'> <Link to="/">Video Tutorials</Link> </h2>
        </header>
        <section>
          <Routes>
            <Route path='/' element={<VideoHome />} />
            <Route path='/user-login' element={<UserLogin />} />
            <Route path='/user-dash' element={<UserDash />} />
            <Route path='/user-register' element={<RegisterUser />} />
            <Route path='/admin-login' element={<AdminLogin />} />
            <Route path='/edit-video/:id'  element={<AdminEditVideo />} />
            <Route path='/delete-video/:id' element={<AdminDeleteVideo />} />
            <Route path='/admin-dash' element={<AdminDash />} />
            <Route path='/add-video' element={<AdminAddVideo />} />
          </Routes>
        </section>
      </HashRouter>
    </div>
  )
}

export default App
