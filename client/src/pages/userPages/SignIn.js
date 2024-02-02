/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import "../../Styles/signIn.css"
import { Icon } from 'react-icons-kit'
import { eyeOff } from 'react-icons-kit/feather/eyeOff'
import { eye } from 'react-icons-kit/feather/eye'
import { useSelector, useDispatch } from 'react-redux'
import { loginChangeValue } from '../../features/loginSlice'
import { userChangeId, userChangeToken, userChangeValue, } from "../../features/userSlice"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loggerComponent from "../../utils/logger"

export default function SignIn() {
  //Initialisation
  const [error, setError] = useState("")
  const [inputType, setInputType] = useState("password")
  const [icon, setIcon] = useState(eyeOff)
  const [idUser, setIdUser] = useState(null)
  const [uData, setUData] = useState({
    email: "",
    password: "",
  })
  const dispatch = useDispatch()
  const { value } = useSelector(state => state.login)
  const [urlFetch, setUrlFetch] = useState(null)
  const [dataBack, setDataBack] = useState(null)
  const navigate = useNavigate()
  //Fonction
  const handleToggle = () => {
    if (inputType === "password") {
      setIcon(eye)
      setInputType("text")
    } else {
      setIcon(eyeOff)
      setInputType("password")
    }
  }
  //sign in 
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (uData.email === "") { toast.warn('Your email please', { position: "top-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, theme: "light", }); }
    else if (uData.password === "") { toast.warn('Your password please', { position: "top-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, theme: "light", }); }
    else {
      const url = "http://localhost:3002/api/tunitour/auth/signin"
      await axios.post(url, uData)
        .then((response) => {
          dispatch(loginChangeValue(!value))
          dispatch(userChangeToken(response.data.token))
          dispatch(userChangeId(response.data._id))
          setIdUser(response.data._id)
        }).catch(err => {
          if (err.request.status === 404) {
            toast.warn("User does not exist", { position: "top-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, theme: "light", });
          }
          if (err.request.status === 400) {
            toast.warn("Password invalid", { position: "top-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, theme: "light", });
          }
        })
    }
  }
  useEffect(() => {
    if (idUser) {
      setUrlFetch(`http://localhost:3002/api/tunitour/users/profile/${idUser}`)
    }
  }, [urlFetch, idUser])
  useEffect(() => {
    if (urlFetch) {
      axios.get(urlFetch).then((response) => {
        setDataBack(response.data);
      })
        .catch((err) => { setError(err); }).finally(() => { });
    }
  }, [dataBack, urlFetch]
  )
  useEffect(() => {
    if (dataBack) {
      const message = { action: "login", idUser: dataBack._id, userFullName: `${dataBack.firstName.toLowerCase()} ${dataBack.lastName.toLowerCase()}`, nationality: dataBack.nationality.toLowerCase() }
      loggerComponent(message)
      dispatch(userChangeValue(dataBack))
      navigate('/')
    }
  })
  const goToForgetPasswordPage = () => {
    const message = { action: "forget password" }
    loggerComponent(message)
    navigate("/forgetpassword")
  }
  //Return 
  return (
    <div bg-color>
      <div className='containerSignIn '>
        <div className='signInFormContainer'>
          <div className='titleSignIn'>
            <h1>Welcome Again ! </h1>
            <span>Login Into Your TuniTour Account </span>
          </div>
          <form className='formSignIn'>
            <div className='inputEmailSignIn'>
              <label>Email </label>
              <input type="email" onChange={(e) => { setUData({ ...uData, email: e.target.value }) }} name="email" className='inputSignIn' placeholder='xyz@abc.xy' />
            </div>
            <div className="inputPassword">
              <label>Password <strong >*</strong></label>
              <div className='passwordVisibilite'>
                <input type={inputType} onChange={(e) => { setUData({ ...uData, password: e.target.value }) }} name="password" require="true" placeholder='***********' />
                <span className="visibilite" onClick={handleToggle}><Icon icon={icon} size={25} /></span>
              </div>
            </div>
            <button onClick={handleSubmit} className="buttonSubmitSignIn">Sign In</button>
            <NavLink to="forgetpassword" onClick={goToForgetPasswordPage} className="forgetpassword"> Froget Password ? </NavLink>
            <Outlet />
          </form>
        </div>
        <ToastContainer />
      </div></div>
  )
}
