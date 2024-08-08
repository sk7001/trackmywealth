import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    profilepic: ""
  })
  const getUser = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser({
        name: response.data.name,
        email: response.data.email,
        profilepic: response.data.profilepic
      });
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    getUser();
  }, [getUser]);

  const handleOnLogout = () => {
    localStorage.clear();
    navigate('/')

  }
  return (
    <div className="Container">
      <div className="FormContainer">
        <nav className='nav'>
          <h1>Hello {user.name}</h1>
        </nav>
        <div className='InputContainer'>
          <h2>Welcome to TrackMyWealth</h2>
          <img src={user.profilepic} alt='profilepic' className='profilepic' />
          <p style={{textAlign:'center'}}><b>Email: </b>{user.email}</p>
          <button onClick={handleOnLogout}>Logout</button>
        </div>
      </div>
    </div>
  )
}
