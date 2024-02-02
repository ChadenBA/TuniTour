import axios from 'axios'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux'
import { pencil } from 'react-icons-kit/fa/pencil'
import { Icon } from 'react-icons-kit'
import { times } from 'react-icons-kit/fa/times'
import { setComments } from "../../features/PlaceSlice"
import loggerComponent from '../../utils/logger'

function Comments(props) {
  const dispatch = useDispatch()
  const [editValue, setEditValue] = useState(false)
  const [newText, setNewText] = useState("")
  const { tokenUser, dataUser, idUser } = useSelector(state => state.user)
  const { value } = useSelector(state => state.login)
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${tokenUser}`,
  };
  //update comments
  const updateComent = async () => {
    await axios.put(`http://localhost:3002/api/comment/${props.cmntr._id}`, { text: newText }, { headers: headers })
      .then((res) => {
        setEditValue(!editValue)
      }).catch(error => { toast.warn(error.response.data.message, { position: "top-center", autoClose: 4000, hideProgressBar: false, closeOnClick: false, pauseOnHover: false, draggable: false, progress: undefined, theme: "light", }); })
    let message
    if (value === true) {
      message = { action: `update comments to ${props.dataPlace.name.toLowerCase()}`, idUser: idUser, userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}`, idPlace: dataUser._id, placeName: props.dataPlace.name.toLowerCase(), }
    }
    loggerComponent(message)
    await axios.get("http://localhost:3002/api/comment/")
      .then((res) => {
        dispatch(setComments(res.data))
      }).catch(error => { toast.warn(error.response.data.message, { position: "top-center", autoClose: 1000, hideProgressBar: false, theme: "light", }); })
  }
  //delete Comment
  const deleteComment = async () => {
    await axios.delete(`http://localhost:3002/api/comment/${props.cmntr._id}`, { headers: headers })
      .then((res) => {
        toast.success(res.data.message, { position: "top-center", autoClose: 500, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" });
        let message
        if (value === true) {
          message = { action: `delete comments from ${props.dataPlace.name.toLowerCase()}  `, idUser: idUser, userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}`, idPlace: dataUser._id, placeName: props.dataPlace.name.toLowerCase(), }
        }
        loggerComponent(message)
      }).catch(error => {
        toast.warn(error.response.data.message, { position: "top-center", autoClose: 500, hideProgressBar: false, closeOnClick: false, pauseOnHover: false, draggable: false, progress: undefined, theme: "light", });
      })
    await axios.get("http://localhost:3002/api/comment/")
      .then((res) => {
        dispatch(setComments(res.data))
      }).catch(error => { toast.warn(error.response.data.message, { position: "top-center", autoClose: 1000, hideProgressBar: false, theme: "light", }); })
  }
  const cancel = () => {
    setEditValue(!editValue)
  }

  return (
    <div className='coments'>
      <h6>{props.cmntr.user.firstName} {props.cmntr.user.lastName}</h6>
      {!editValue &&
        <div className='contentCmnts'>
          <p>{props.cmntr.text} </p>
          {props.edit && <div className='iconsEditCmnts'>
            <Icon icon={pencil} size={20} onClick={() => { setEditValue(!editValue) }} ></Icon>
            <Icon icon={times} size={20} onClick={deleteComment} ></Icon>
          </div>}
        </div>}
      {editValue &&
        <div className='edit-cpnts-value'>
          <input type="text" placeholder={props.cmntr.text} onChange={(e) => { setNewText(e.target.value) }} />
          <Icon icon={times} size={30} style={{ marginLeft: '1vh', marginTop: "1vh" }} onClick={cancel} ></Icon>
          <button onClick={updateComent}> Edit</button>
        </div>
      }
      <ToastContainer />
    </div>
  )
}

export default Comments
