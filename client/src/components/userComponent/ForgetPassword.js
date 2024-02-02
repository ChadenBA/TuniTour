import axios from 'axios'
import React, { useState } from 'react'
import '../../Styles/forgetPass.css'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { reply } from 'react-icons-kit/icomoon/reply'
import { Icon } from 'react-icons-kit'

function ForgetPassword() {
  const [email, setEmail] = useState(null)
  const postData = async () => {
    const url = "http://localhost:3002/api/tunitour/auth/forgetpassword"
    await axios.post(url, { email })
      .then(() => {
        toast.success("Password Reset Link Has Been Sent To Your Email", { position: "top-center", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
      }).catch(err => {
        toast.warn(err.response.data.message, { position: "top-center", autoClose: 4000, hideProgressBar: false, closeOnClick: false, pauseOnHover: false, draggable: false, progress: undefined, theme: "light", });
      })
  }
  const navigate = useNavigate()
  const cancel = () => {
    navigate('/signin')
  }
  return (
    <div>
      <div className='forgetPass'>
        <div className='back'>
          <Icon icon={reply} size={30} onClick={cancel}></Icon>
          <h3 onClick={cancel} style={{ marginLeft: "10px" }}> back </h3>
        </div>
        <label>Email</label>
        <input className='forgetPassEmail' type='email' placeholder='Email...' onChange={(e) => { setEmail(e.target.value) }}></input>
        <button className='btnFP' onClick={postData}>SEND</button>
        <ToastContainer />
      </div>
    </div>
  )
}

export default ForgetPassword
