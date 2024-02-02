import React, { useState, useMemo } from 'react'
import axios from 'axios'
import "../../Styles/signup.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loggerComponent from "../../utils/logger"
import { Icon } from 'react-icons-kit'
import { eyeOff } from 'react-icons-kit/feather/eyeOff'
import { eye } from 'react-icons-kit/feather/eye'
import Select from 'react-select'
import { useNavigate } from 'react-router-dom';
import countryList from 'react-select-country-list'
export default function SignUp() {
  const [inputType, setInputType] = useState("password")
  const [inputTypeAgain, setInputTypeAgain] = useState("password")
  const [icon, setIcon] = useState(eyeOff)
  const [iconAgain, setIconAgain] = useState(eyeOff)
  const [verifPass, setVerifPass] = useState("")
  const [firstName, setFname] = useState("")
  const [lastName, setLname] = useState("")
  const [age, setAge] = useState(Number)
  const [nationality, setNationality] = useState("")
  const [phone, setPhone] = useState("")
  const [adress, setAdress] = useState("")
  const [password, setPass] = useState("")
  const [email, setEmail] = useState("")
  const [bio, setBio] = useState("")
  const navigate = useNavigate()
  const options = useMemo(() => countryList().getData(), [])
  const handleToggle = () => {
    if (inputType === "password") {
      setIcon(eye)
      setInputType("text")
    } else {
      setIcon(eyeOff)
      setInputType("password")
    }
  }
  const handleToggleAgain = () => {
    if (inputTypeAgain === "password") {
      setIconAgain(eye)
      setInputTypeAgain("text")
    } else {
      setIconAgain(eyeOff)
      setInputTypeAgain("password")
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const url = "http://localhost:3002/api/tunitour/auth/signup"
    if (firstName.length === 0 || lastName.length === 0) {
      toast.warn('Your name please', { position: "top-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, theme: "light", });
    }
    else if (email.length === 0) {
      toast.warn('Your email please', { position: "top-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, theme: "light", });
    }
    else if (password.length === 0) {
      toast.warn('Your email please', { position: "top-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, theme: "light", });
    }
    else if (password === verifPass) {
      await axios.post(url, { firstName, lastName, email, password, adress, phone, age, nationality, bio })
        .then(() => {
          toast.success("Created successfully , you can go to sign in ", { position: "top-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, theme: "light" });
          const message = { action: "create account", userFullName: `${firstName.toLowerCase()} ${lastName.toLowerCase()}`, nationality: nationality.toLowerCase(), age: age }
          loggerComponent(message)
          navigate("/signin")
        }).catch(err => { toast.warn(err.response.data.message, { position: "top-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, theme: "light", }); })
    } else { toast.warn('Passwords are different', { position: "top-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, theme: "light", }); }
  }
  const changeHandler = value => {
    setNationality(value.label)
  }

  return (
    <div className='containerSignUp'>
      <form className='formContainer'>
        <h1>Welcome to TuniTour</h1>
        <span>Create account</span>
        <div className='inputs-signup'>
          <div className='FLname'>
            <div className='inputPart'>
              <label>First Name <strong >*</strong> </label>
              <input type="text" onChange={(e) => { setFname(e.target.value) }} name="firstName" require="true" value={firstName} />
            </div>
            <div className='inputPart'>
              <label>Last Name <strong >*</strong></label>
              <input type="text" onChange={(e) => { setLname(e.target.value) }} name="lastName" require="true" value={lastName} />
            </div>
          </div>
          <div className='inputEmail'>
            <label>Email <strong >*</strong> </label>
            <input type="email" onChange={(e) => { setEmail(e.target.value) }} name="email" require="true" value={email} />
          </div>
          <div className='passwordT'>
            <div className="inputPart">
              <label>Password <strong >*</strong></label>
              <div className='inputPasswordContent'>
                <input type={inputType} onChange={(e) => { setPass(e.target.value) }} name="password" require="true" value={password} />
                <Icon icon={icon} size={20} onClick={handleToggle} id="visibiliteSignUp"></Icon>
              </div>
            </div>
            <div className="inputPart">
              <label>Confirm password <strong >*</strong></label>
              <div className='inputPasswordContent'>
                <input type={inputTypeAgain} onChange={(e) => { setVerifPass(e.target.value) }} name="password" require="true" />
                <Icon icon={iconAgain} size={20} onClick={handleToggleAgain} id="visibiliteSignUpAgain"></Icon>
              </div>
            </div>
          </div>
          <div className='telAge'>
            <div className="inputPart">
              <label>Telephone </label>
              <input type="text" onChange={(e) => { setPhone(e.target.value) }} name="telephone" value={phone} />
            </div>
            <div className="inputPart">
              <label>Age</label>
              <input type="number" onChange={(e) => { setAge(e.target.value) }} name="age" />
            </div>
          </div>
          <div className='inputEmail'>
            <label>Bio <strong ></strong> </label>
            <input type="text" onChange={(e) => { setBio(e.target.value) }} name="bio" value={bio} />
          </div>
          <div className='adrNation'>
            <div className="inputPart">
              <label>adress</label>
              <input type="text" onChange={(e) => { setAdress(e.target.value) }} name="nationality" value={adress} />
            </div>
            <div className="inputNationality">
              <label>Nationality</label>
              <Select options={options} value={nationality} className='selectCountry' onChange={changeHandler} />
            </div>
          </div>
          <ToastContainer />
          <div className='btns'>
            <button onClick={handleSubmit} className="buttonSubmitSignUp">Sign Up</button>
          </div>
        </div>
      </form>
    </div>
  )
}
