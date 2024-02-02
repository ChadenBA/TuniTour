import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


import { Icon } from 'react-icons-kit'
import { eyeOff } from 'react-icons-kit/feather/eyeOff'
import { eye } from 'react-icons-kit/feather/eye'

import "../../Styles/security.css"
import axios from 'axios'
import AccountBoxIcon from '@mui/icons-material/AccountBox';

import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useSelector, useDispatch } from 'react-redux'
import { UpdateEmail } from "../../features/userSlice"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loggerComponent from '../../utils/logger'

function Security() {
  const { dataUser, tokenUser, idUser } = useSelector(state => state.user)
  const [email, setEmail] = useState("")
  const [viewCode, setViewCode] = useState(false)
  const [code, setCode] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [oldPass, setOldPass] = useState("")
  const [newPass, setNewPass] = useState("")
  const [confirmPass, setConfirmPass] = useState("")

  const [inputTypeOld, setInputTypeOld] = useState("password")
  const [inputTypeNew, setInputTypeNew] = useState("password")
  const [inputTypeConf, setInputTypeConf] = useState("password")


  const [iconOld, setIconOld] = useState(eyeOff)
  const [iconNew, setIconNew] = useState(eyeOff)
  const [iconConf, setIconConf] = useState(eyeOff)


  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${tokenUser}`,
  }
  const cancelPass = () => {
    setOldPass("")
    setNewPass("")
    setConfirmPass("")
    var message = {
      action: `cancel changes security`,
      idUser: idUser,
      userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}`,
    }

    loggerComponent(message)
  }


  const cancel = () => {
    setEmail("")
    var message = {
      action: `cancel changes security`,
      idUser: idUser,
      userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}`,
    }
    loggerComponent(message)
  }



  const sendCode = async () => {
    await axios.post(`http://localhost:3002/api/tunitour/users/profile/${idUser}/security/email`, { email }, {
      headers: headers
    })
      .then((res) => {
        toast.success(res.data.message, {
          position: "top-center", autoClose: 1000, hideProgressBar: false, progress: undefined, theme: "light",
        });
        setViewCode(!viewCode)
        var message = {
          action: `send code to new email security`,
          idUser: idUser,
          userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}`,
        }

        loggerComponent(message)
      }).catch((err) => {
        toast.warn(err.response.data.message, {
          position: "top-center", autoClose: 1000, hideProgressBar: false, progress: undefined, theme: "light",
        });
      })
  }










  const validation = async () => {
    await axios.put(`http://localhost:3002/api/tunitour/users/profile/${idUser}/security/valide-email`, { code }, {
      headers: headers
    })
      .then((res) => {
        toast.success(res.data.message, {
          position: "top-center", autoClose: 1000, hideProgressBar: false, progress: undefined, theme: "light",
        });
        setViewCode(!viewCode)
        dispatch(UpdateEmail(email))
        var message = {
          action: `change new email security`,
          idUser: idUser,
          userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}`,
        }

        loggerComponent(message)
      }).catch((err) => {
        toast.warn(err.response.data.message, {
          position: "top-center", autoClose: 1000, hideProgressBar: false, progress: undefined, theme: "light",
        });
      })
  }






  const updatePassword = async () => {
    if (oldPass === "" || newPass === "" || confirmPass === "") {
      toast.warn("please fill all mandatory fields.", {
        position: "top-center", autoClose: 1000, hideProgressBar: false, progress: undefined, theme: "light",
      });
    } else {
      var message = {
        action: `change password security`,
        idUser: idUser,
        userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}`,
      }

      loggerComponent(message)
      await axios.put(`http://localhost:3002/api/tunitour/users/profile/${idUser}/security/password`, { oldPass, newPass, confirmPass }, {
        headers: headers
      })
        .then((res) => {
          setOldPass("")
          setNewPass("")
          setConfirmPass("")
          toast.success(res.data.message, {
            position: "top-center", autoClose: 1000, hideProgressBar: false, progress: undefined, theme: "light",
          });
        }).catch((err) => {
          toast.warn(err.response.data.message, {
            position: "top-center", autoClose: 1000, hideProgressBar: false, progress: undefined, theme: "light",
          });
        })
    }
  }
  const oldVisibility = () => {
    if (inputTypeOld === "password") {
      setIconOld(eye)
      setInputTypeOld("text")
    } else {
      setIconOld(eyeOff)
      setInputTypeOld("password")
    }
  }
  const newVisibility = () => {
    if (inputTypeNew === "password") {
      setIconNew(eye)
      setInputTypeNew("text")
    } else {
      setIconNew(eyeOff)
      setInputTypeNew("password")
    }
  }
  const confVisibility = () => {
    if (inputTypeConf === "password") {
      setIconConf(eye)
      setInputTypeConf("text")
    } else {
      setIconConf(eyeOff)
      setInputTypeConf("password")
    }
  }
  const handleEdit = () => {
    navigate("/profile/edit-profile")
  }
  const handleProfile = () => {
    navigate("/profile/")
  }
  return (
    <div className='User-profile-container'>
      <div className='rigth-bar-user'>
        <div className='rigth-bar-top-user'>

          <div className='photo-conatiner-user'>
            <img className="user-photo-profile" src={dataUser.photoProfile.url} alt="profile" />
          </div>
          <div className='rigth-user-name-container'>
            <div><span >{dataUser.firstName} {dataUser.lastName}</span></div>
            <div><span style={{ color: "#C0C0C0" }}> {dataUser.nationality} </span> </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }} className='rigth-bar-bottom-user'>
          <div className='navigate-user-update'>
            <AccountBoxIcon style={{ color: "#696969" }} />
            <button onClick={handleProfile}>Profile</button>
          </div>
          <div className='navigate-user-update'>
            <BorderColorIcon style={{ color: "#696969" }} />
            <button onClick={handleEdit}>Edit</button>
          </div>

        </div>

      </div>
      <div className='left-bar-user'>
        <table><tbody>
          <tr>
            <td style={{ border: "none", fontSize: 18, fontWeight: "bold" }}>Password</td>
          </tr>
          <tr>
            <td>Old password</td>
            <td style={{ fontSize: 15, color: "#696969", textTransform: "capitalize", display: "flex" }}>
              <input type={inputTypeOld} value={oldPass} pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}" placeholder='old password' onChange={(e) => { setOldPass(e.target.value) }} />
              <Icon icon={iconOld} onClick={oldVisibility} />
            </td>
          </tr>
          <tr>
            <td> New password </td>
            <td style={{ fontSize: 15, color: "#696969", display: "flex", textTransform: "capitalize" }}>
              <input type={inputTypeNew} value={newPass} pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}" placeholder='new password' onChange={(e) => { setNewPass(e.target.value) }} />
              <Icon icon={iconNew} onClick={newVisibility} />
            </td>
          </tr>
          <tr>
            <td> Confirm new password </td>
            <td style={{ fontSize: 15, color: "#696969", textTransform: "capitalize", display: "flex" }}>
              <input type={inputTypeConf} value={confirmPass} pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}" placeholder='confirm new password' onChange={(e) => { setConfirmPass(e.target.value) }} />
              <Icon icon={iconConf} onClick={confVisibility} />
            </td>
          </tr>
          <tr>
            <td style={{ border: "none" }}>
              <button className='left-user-edit ' style={{ marginRight: 10, marginBottom: 10 }} onClick={updatePassword}>Change</button>
              <button className='left-user-edit ' onClick={cancelPass}> Cancel</button>
            </td>
          </tr>
          <tr>
            <td style={{ border: "none", fontSize: 18, fontWeight: "bold" }}>Email</td>
          </tr>
          <tr>
            <td>Email</td>
            <td style={{ fontSize: 18, color: "#696969" }}><input type="email" placeholder={dataUser.email} value={email} onChange={(e) => { setEmail(e.target.value) }} /></td>
          </tr>
          <tr>
            <td style={{ border: "none" }}>
              <button className='left-user-edit ' onClick={sendCode} style={{ marginRight: 10, marginBottom: 10 }}>send code</button>
              <button className='left-user-edit ' onClick={cancel}> Cancel</button>
            </td>
          </tr>
          {viewCode &&
            <tr>
              <td >
                <input type="text" onChange={(e) => { setCode(e.target.value) }} placeholder="code" ></input>
              </td>
              <td style={{ fontSize: 18, color: "#696969" }}>
                <button className='left-user-edit ' style={{ marginRight: 10, marginBottom: 10 }} onClick={validation}>Validation</button>
              </td>
            </tr>
          }
        </tbody></table>
        <div>
        </div>

      </div>
      <ToastContainer />
    </div>
  )
}

export default Security
