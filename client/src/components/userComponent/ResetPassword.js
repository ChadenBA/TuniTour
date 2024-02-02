import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../../Styles/forgetPass.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Icon } from 'react-icons-kit'
import { eyeOff } from 'react-icons-kit/feather/eyeOff'
import { eye } from 'react-icons-kit/feather/eye'


export default function ResetPassword() {

  const { id, token } = useParams()
  const [url, setUrl] = useState(null)

  const [pass1, setPass1] = useState(null)
  const [pass2, setPass2] = useState(null)

  const [inputType, setInputType] = useState("password")
  const [inputTypeAgain, setInputTypeAgain] = useState("password")

  const [icon, setIcon] = useState(eyeOff)
  const [iconAgain, setIconAgain] = useState(eyeOff)

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

  useEffect(() => {
    setUrl(`http://localhost:3002/api/tunitour/auth/resetpassword/${id}/${token}`)
  }, [id, token])

  const navigate = useNavigate()


  const go = async () => {

    if (pass1 === pass2) {

      await axios({
        method: 'put',
        url: url,
        data: {
          password: pass1,
        }
      });
      navigate('/signin')
    } else {
      toast.warn('Validate the password , please !', {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    }

  }


  return (
    <div className='resetPassContainer'>
      <h3 className='resetTitle'>Reset your password</h3>

      <div className='divRP' >
        <label>Password</label>
        <div className='divRP_pass1'>
          <input className="resetPass" type={inputType} onChange={(e) => { setPass1(e.target.value) }}></input>
          <Icon icon={icon} size={25} onClick={handleToggle} />
        </div>
      </div>


      <div className='divRP'>
        <label>Password</label>
        <div className='divRP_pass1'>
          <input className="resetPass" type={inputTypeAgain} onChange={(e) => { setPass2(e.target.value) }}></input>
          <Icon icon={iconAgain} size={25} onClick={handleToggleAgain} />

        </div>
      </div>
      <br />
      <button className='btnRP' onClick={go}>Clik me</button>
      <ToastContainer />
    </div>
  )
}
