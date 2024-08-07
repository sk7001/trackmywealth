import { Link, useNavigate } from "react-router-dom";
import "./Register.css"
import { useState } from "react";
import { emailRegex, passwordRegex } from "../../../Utils/Regex";
import toast from "react-hot-toast";
import axios from "axios";


function Register() {
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

  const navigate = useNavigate();

  const handleonclick = async () => {
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

    try {
      toast.loading("Signing up")
      const user = {
        username: userDetails.username,
        phonenumber: userDetails.phonenumber,
        email: userDetails.email,
        password: userDetails.password,
      }
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/user/register`, user);
      console.log(response.data);
      toast.dismiss();
      toast.success(response.data.message)
      navigate("/")
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
          <input value={userDetails.username} name="username" type="text" onChange={handleonchange} placeholder="User Name" autocomplete="off" />
          <input value={userDetails.phonenumber} name="phonenumber" type="number" className="no-arrow" onChange={handleonchange} placeholder="Phone Number (Including Country Code)" autocomplete="off" />
          <input value={userDetails.email} name="email" type="text" onChange={handleonchange} placeholder="E-Mail" autocomplete="off" />
          <div className="PasswordContainer">
            <input value={userDetails.password} name="password" type={showp ? "text" : "Password"} onChange={handleonchange} placeholder="Password" autocomplete="off" />
            <button onClick={handleshowp}>{showp ? "HIDE" : "SHOW"}</button>
          </div>
          <div className="PasswordContainer">
            <input value={userDetails.confirmPassword} name="confirmPassword" type={showcp ? "text" : "Password"} onChange={handleonchange} placeholder="Password" autocomplete="off" />
            <button onClick={handleshowcp}>{showcp ? "HIDE" : "SHOW"}</button>
          </div>
          <button onClick={handleonclick}>Signup</button>
        </div>
        <Link to="/">Already have an account? Login</Link>
      </div>
    </div>
  );
}

export default Register;