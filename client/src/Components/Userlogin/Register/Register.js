import { Link, useNavigate } from "react-router-dom";
import "./Register.css"
import { useState } from "react";
import { emailRegex, passwordRegex } from "../../../Utils/Regex";
import toast from "react-hot-toast";
import axios from "axios";

export default function Register() {
  const [step, setStep] = useState(0);
  return (
    <div>
      {step === 0 && <Signup setStep={setStep} />}
      {step === 1 && <Upload />}
    </div>
  )
}

function Signup({ setStep }) {
  const [userDetails, setuserDetails] = useState({

    username: "",
    image: "",
    phonenumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [showcp, setshowcp] = useState(false)
  const [showp, setshowp] = useState(false)
  function handleonchange(event) {
    const { name, value } = event.target;
    setuserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
    console.log(userDetails)
  }

  const handleonclick = async () => {
    localStorage.setItem("email", userDetails.email)
    if (!userDetails.username) {
      toast.error("Username is required");
      return;
    }

    if (!emailRegex.test(userDetails.email)) {
      toast.error("Please enter a valid email");
      return;
    }

    if (!passwordRegex.test(userDetails.password)) {
      toast.error("Password must be atleast 8 characters and must include at least one special character and one number.");
      return;
    }
    if (!userDetails.password === userDetails.confirmPassword) {
      toast.error("Passwords do not match");
      return
    }
    try {
      toast.loading("Signing up")
      const user = {
        username: userDetails.username,
        phonenumber: userDetails.phonenumber,
        email: userDetails.email,
        password: userDetails.password,
      }
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/user/register`, user);
      if (response) {
        setStep(1)
      } console.log(response.data);
      toast.dismiss();
      toast.success(response.data.message)
    } catch (error) {
      console.log(error)
      toast.dismiss();
      toast.error(error.response.data.message)
    }
  }

  function handleshowp() {
    setshowp(!showp)
  }
  function handleshowcp() {
    setshowcp(!showcp)
  }

  return (
    <div className="Container">
      <div className="FormContainer">
        <h2>Signup</h2>
        <div className="InputContainer">
          <input value={userDetails.username} name="username" type="text" onChange={handleonchange} placeholder="User Name" />
          <input value={userDetails.phonenumber} name="phonenumber" type="number" className="no-arrow" onChange={handleonchange} placeholder="Phone Number (Including Country Code)" />
          <input value={userDetails.email} name="email" type="text" onChange={handleonchange} placeholder="E-Mail" />
          <div className="PasswordContainer">
            <input value={userDetails.password} name="password" type={showp ? "text" : "Password"} onChange={handleonchange} placeholder="Password" />
            <button onClick={handleshowp}>{showp ? "HIDE" : "SHOW"}</button>
          </div>
          <div className="PasswordContainer">
            <input value={userDetails.confirmPassword} name="confirmPassword" type={showcp ? "text" : "Password"} onChange={handleonchange} placeholder="Password" />
            <button onClick={handleshowcp}>{showcp ? "HIDE" : "SHOW"}</button>
          </div>
          <button onClick={handleonclick}>Signup</button>
        </div>
        <Link to="/">Already have an account? Login</Link>
      </div>
    </div>
  );
}


function Upload() {
  const [file, setfile] = useState(null);
  const navigate = useNavigate();
  function previewfile(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setfile(reader.result);
    }
  }
  const handleOnChange = (event) => {
    const file = event.target.files[0]
    console.log(file.size)
    if (file.size > 1048576) {
      return toast.error("Please upload image under 10MB.")
    }
    setfile(file);
    previewfile(file)
  }
  const handleOnClick = async () => {
    try {
      toast.loading("Uploading profile picture")
      if (!file) {
        return toast.error("Uploading a profile picture is mandatory.")
      }
      const email = localStorage.getItem("email")
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/user/uploadprofilepic`, { email: email, file })
      toast.dismiss();
      toast.success(response.data.message)
      setfile(response.data.result.url)
      navigate("/")
      localStorage.clear()
      console.log(response.data.result.url)
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error(error.response.data.message)
    }
  }
  const email = localStorage.getItem("email")
  return (
    <div className="Container">
      <div className="FormContainer">
        <h2>Upload</h2>
        <div className="InputContainer">
          <img src={file || require("../../../assets/images/defaultuserlogo.png")} className="profilepic" alt="profilepic" />
          <input type="email" value={email} disabled="true"/>
          <input type='file' accept='image/png, image/jpeg' onChange={handleOnChange} />
          <button onClick={handleOnClick}>Submit</button>
        </div>
        <Link to="/">Already have an account? Login</Link>
      </div>
    </div>
  )
}
