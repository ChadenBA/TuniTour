import React, { useEffect, useState, useMemo } from 'react'
import "../../Styles/editProfile.css"
import { useSelector, useDispatch } from 'react-redux'
import { uploadPhoto, updateProfile } from "../../features/userSlice"
import Select from 'react-select'
import { useNavigate } from 'react-router-dom'
import loggerComponent from '../../utils/logger'
import axios from 'axios'
import swal from "sweetalert"
import SecurityIcon from '@mui/icons-material/Security';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import countryList from 'react-select-country-list'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
export default function EditProfile() {

  const { dataUser, tokenUser, idUser } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [firstName, setFname] = useState(dataUser.firstName)
  const [lastName, setLname] = useState(dataUser.lastName)
  const [age, setAge] = useState(dataUser.age)
  const [nationality, setNationality] = useState(dataUser.nationality)
  const [phone, setPhone] = useState(dataUser.phone)
  const [adress, setAdress] = useState(dataUser.adress)
  const [bio, setBio] = useState(dataUser.bio)
  const [image, setImage] = useState(null)
  const options = useMemo(() => countryList().getData(), [])
  const navigate = useNavigate()


  const cancel = () => {
    var message = {
      action: `cancel changes`,
      idUser: idUser,
      userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}`,
    }

    loggerComponent(message)
    navigate("/profile")
  }
  const handleImg = (e) => {
    setImage(e.target.files[0])
  }
  const changeImg = async () => {
    swal({
      title: "Are you sure?",
      text: "Do you want to change your profile picture?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async () => {
      const formdata = new FormData()
      formdata.append("image", image)
      await axios.post("http://localhost:3002/api/tunitour/users/profile/profile-photo", formdata, {
        headers: {
          'Authorization': `Bearer ${tokenUser}`,
          'Content-Type': 'multipart/form-data'
        }
      }
      ).then(res => {
        dispatch(uploadPhoto(res.data.profilePhoto))
        toast.success(res.data.message)
        setImage(null)
      }).catch(err => {
        toast.warn(err.response.data.message, {
          position: "top-center", autoClose: 1000, hideProgressBar: false, theme: "light",
        });
      }).finally(() => {
      });
    });
  }
  useEffect(() => {
    if (image !== null) {
      changeImg()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image])

  const deleteProfilePhoto = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, the default picture will be your profile picture !",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async () => {
      await axios.put("http://localhost:3002/api/tunitour/users/profile/profile-photo/delete", {}, {
        headers: {
          'Authorization': `Bearer ${tokenUser}`,
          'Content-Type': 'multipart/form-data'
        }
      }
      ).then(res => {
        dispatch(uploadPhoto(res.data.profilePhoto))
      }).catch(err => {
        toast.warn(err.response.data.message, {
          position: "top-center", autoClose: 1000, hideProgressBar: false, theme: "light",
        });
      })
    });
  }
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${tokenUser}`,
  };

  const save = async () => {
    var message
    console.log(firstName)
    if (firstName !== dataUser.firstName) {
      message = {
        action: `wanna change first name `,
        idUser: idUser,
        userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}`,
      }

      loggerComponent(message)
    }
    if (lastName !== dataUser.lastName) {
      message = {
        action: `wanna change last name `,
        idUser: idUser,
        userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}`,
      }

      loggerComponent(message)
    }
    if (age !== dataUser.age) {
      message = {
        action: `wanna change age `,
        idUser: idUser,
        userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}`,
      }

      loggerComponent(message)
    }
    if (adress !== dataUser.adress) {
      message = {
        action: `wanna change adress  `,
        idUser: idUser,
        userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}`,
      }

      loggerComponent(message)
    }
    if (nationality !== dataUser.nationality) {
      message = {
        action: `wanna change nationality  `,
        idUser: idUser,
        userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}`,
      }

      loggerComponent(message)
    }
    if (phone !== dataUser.phone) {
      message = {
        action: `wanna change nationality  `,
        idUser: idUser,
        userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}`,
      }

      loggerComponent(message)
    }
    await axios.put(`http://localhost:3002/api/tunitour/users/profile/${idUser}`,
      { firstName, lastName, adress, age, nationality, phone, bio },
      { headers }
    ).then(res => {
      dispatch(updateProfile(res.data))
      message = {
        action: `save changes nationality  `,
        idUser: idUser,
        userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}`,
      }

      loggerComponent(message)
      toast.success("your profile updated successfully")
    }).catch(err => {
      toast.warn(err.response.data.message, {
        position: "top-center", autoClose: 1000, hideProgressBar: false, theme: "light",
      });
    })

  }


  const handleSecure = () => {
    navigate("/profile/security")
  }
  const handleProfile = () => {
    navigate("/profile/")
  }
  const changeHandler = value => {
    setNationality(value.label)
  }
  return (
    <div className='User-profile-container'>
      <div className='rigth-bar-user'>
        <div className='rigth-bar-top-user'>

          <div className='photo-conatiner-user'>
            <img className="user-photo-profile" src={dataUser.photoProfile.url} alt="profile" />
          </div>

          <div className='rigth-user-name-container'>
            <div className="custom-file-upload" onChange={handleImg}>
              <input type="file" id="file-upload" name="file-upload" />
              <label htmlFor="file-upload">Upload</label>
            </div>
            <button className='update-user-profile-bouton' onClick={deleteProfilePhoto}> Delete</button>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }} className='rigth-bar-bottom-user'>
          <div className='navigate-user-update'>
            <AccountBoxIcon style={{ color: "#696969" }} />
            <button onClick={handleProfile}>Profile</button>
          </div>
          <div className='navigate-user-update'>
            <SecurityIcon style={{ color: "#696969" }} />
            <button onClick={handleSecure}>Security</button>
          </div>
          <div className='navigate-user-update'>
            <PersonRemoveIcon style={{ color: "#696969" }} />
            <button onClick={handleSecure}>Delete account</button>
          </div>

        </div>

      </div>
      <div className='left-bar-user'>
        <table><tbody>
          <tr>
            <td style={{ fontSize: 18 }}>First name </td>
            <td style={{ fontSize: 18, color: "#696969", textTransform: "capitalize" }}><input type="text" value={firstName} placeholder={dataUser.firstName} onChange={(e) => { setFname(e.target.value) }} /></td>
          </tr>
          <tr>
            <td>Last name </td>
            <td style={{ fontSize: 18, color: "#696969", textTransform: "capitalize" }}><input type="text" placeholder={dataUser.lastName} value={lastName} onChange={(e) => { setLname(e.target.value) }} /></td>
          </tr>
          <tr>
            <td>Adress </td>
            <td style={{ fontSize: 18, color: "#696969", textTransform: "capitalize" }}><input type="text" placeholder={dataUser.adress} onChange={(e) => { setAdress(e.target.value) }} /></td>
          </tr>
          <tr>
            <td>Phone </td>
            <td style={{ fontSize: 18, color: "#696969", textTransform: "capitalize" }}> <input type="text" placeholder={dataUser.phone} onChange={(e) => { setPhone(e.target.value) }} /></td>
          </tr>
          <tr>
            <td>Age</td>
            <td style={{ fontSize: 18, color: "#696969", textTransform: "capitalize" }}><input type="number" placeholder={dataUser.age} value={age} onChange={(e) => { setAge(e.target.value) }} /></td>
          </tr>
          <tr>
            <td>Bio</td>
            <td style={{ fontSize: 18, color: "#696969" }}><input placeholder={dataUser.bio} onChange={e => { setBio(e.target.value) }} /></td>
          </tr>
          <tr>
            <td> Nationality </td>
            <td style={{ fontSize: 18, color: "#696969", textTransform: "capitalize" }}><Select options={options} value={nationality} onChange={changeHandler} /> </td>
          </tr>
        </tbody></table>
        <div>
          <button className='left-user-edit ' style={{ marginRight: 10 }} onClick={save}>Save</button>
          <button className='left-user-edit ' onClick={cancel}> Cancel</button>
        </div>

      </div>
      <ToastContainer />
    </div>

  )
}
