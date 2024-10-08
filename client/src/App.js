import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './Components/Userlogin/Register/Register';
import Auth from './Utils/Auth';
import Forgotpass from './Components/Userlogin/Forgetpass/Forgetpass';
import ResendVerification from './Components/Userlogin/ResendVerification/ResendVerification';
import Login from './Components/Userlogin/Login/Login';
import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route default path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgetpass' element={<Forgotpass/>}/>
        <Route path='/resendverificationlink' element={<ResendVerification/>}/>
        <Route element={<Auth />}>
          <Route path='/home' element={<Home />} />
          <Route path='/profile' element={<Profile/>}/>
        </Route>
        <Route path='*'element={<h2>404 Page not found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
