import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Taskbar from '../../objects/Taskbar';
import toast from 'react-hot-toast';

export default function Profile() {
    const [step, setStep] = useState(0);
    const [user, setUser] = useState({
        name: "",
        email: "",
        profilepic: "",
        phonenumber: ""
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
                profilepic: response.data.profilepic,
                phonenumber: response.data.phonenumber
            });
            console.log(user)
        } catch (error) {
            console.log(error);
        }// eslint-disable-next-line
    }, []);
    useEffect(() => {
        getUser();
    }, [getUser]);
    return (
        <div>
            {step === 0 && <ViewProfile setStep={setStep} user={user} />}
            {step === 1 && <DeleteProfile user={user} />}
        </div>
    )
}

const ViewProfile = ({ setStep, user }) => {
    const navigate = useNavigate();

    const handleOnHome = () => {
        navigate('/home')
    }

    const handleOnDelete = async () => {
        setStep(1)
    }
    return (
        <div className="Container">
            <Taskbar profilepic={user.profilepic} />
            <div className="FormContainer">
                <nav className='nav'>
                    <h1>Hello {user.name}</h1>
                </nav>
                <div className='InputContainer'>
                    <img src={user.profilepic} alt='profilepic' className='profilepic' />
                    <p style={{ textAlign: 'center', margin: '0px' }}><b>Email: </b>{user.email}</p>
                    <p style={{ textAlign: 'center', margin: '0px' }}><b>Phone Number: </b>{user.phonenumber}</p>
                    <button onClick={handleOnHome}>Home</button>
                    <button onClick={handleOnDelete} style={{ marginTop: 50, backgroundColor: "darkred" }}>Delete Account</button>
                </div>
            </div>
        </div>
    )
}

const DeleteProfile = ({ user }) => {
    const [showp, setshowp] = useState(false)
    const navigate = useNavigate();
    const [password, setPassword] = useState({
        password: "",
    })
    const handleonchange = (e) => {
        setPassword(e.target.value)
        console.log(password)
    }
    function handleshowp() {
        setshowp(!showp)
    }
    const handleonclick = async () => {
        try{
            toast.loading("Deleting user")
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/user/deleteaccount`, {email:user.email, password:password})
            navigate('/')
            toast.dismiss()
            localStorage.clear()
            toast.success(response.data.message)
        }catch(error){
            toast.error(error.response.data.message)
        }

    }
    return (
        <div className="Container">
            <div className="FormContainer" style={{width:'380px'}}>
                <h2>Please enter your password.</h2>
                <p style={{marginBottom:"20px"}}>If you signed in using Google, then a password has been sent to your mail at the time of creation of account.</p>
                <div className="InputContainer">
                    <div className="PasswordContainer">
                        <input value={password.password} name="confirmPassword" type={showp ? "text" : "Password"} onChange={handleonchange} placeholder="Confirm Password" />
                        <button onClick={handleshowp}>{showp ? "HIDE" : "SHOW"}</button>
                    </div>
                    <button onClick={handleonclick}>Delete Account</button>
                </div>
                <Link to="/forgetpass">Want to reset password? Reset Password</Link>
                <Link to="/home">Changed you mind ? Go back</Link>
            </div>
        </div>
    )
}