import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import "./Home.css";
import Taskbar from '../../objects/Taskbar';

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

  return (
    <div className="Container">
      <Taskbar name={user.name} profilepic={user.profilepic}/>
      <div className="FormContainer">
        <div className='InputContainer'>
          <h2>Welcome to TrackMyWealth</h2>
        </div>
      </div>
    </div>
  )
}
