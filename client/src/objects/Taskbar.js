import React from 'react';
import "./Taskbar.css";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Taskbar(props) {
    const navigate = useNavigate();
    const handleOnLogout = () => {
        localStorage.clear();
        navigate('/')
        toast.success("Successfully logged out.")
    }
    const handleOnProfile = () => {
        toast.loading("Opening profile...")
        navigate('/profile')
        toast.dismiss()
    }
    return (
        <div className='hnavbar'>
            <img src={props.profilepic} onClick={handleOnProfile} alt='profilepicture'/>
            <button onClick={handleOnLogout} className='logout'>Logout</button>
        </div>
    )
}
