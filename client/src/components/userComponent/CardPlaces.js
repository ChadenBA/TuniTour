import React, { useEffect, useState } from 'react'
import '../../Styles/CardPlace.css'
import { ToastContainer, toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Icon } from 'react-icons-kit'
import { ic_favorite } from 'react-icons-kit/md/ic_favorite'
import { ic_favorite_border } from 'react-icons-kit/md/ic_favorite_border'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { setRate } from "../../features/PlaceSlice"
import { setBucketList, setVisitedList, userChangeValue } from "../../features/userSlice"
import loggerComponent from '../../utils/logger'
import ratePlace from '../../redux/apiCalls/ratePlace';
import { setPlace } from "../../features/PlaceSlice"
import bucketListAdd from '../../redux/apiCalls/bucketListAdd';
import bucketListDelete from '../../redux/apiCalls/bucketListDelete';
import visitedListAdd from '../../redux/apiCalls/visitedListeAdd';
import visitedListDelete from '../../redux/apiCalls/visitedListDelete';
import handleLikeAction from '../../redux/apiCalls/handleLike';

function CardPlaces(props) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentPlace = props.element
  const id = currentPlace._id
  const [, forceUpdate] = useState();
  const { value } = useSelector(state => state.login)
  const { tokenUser, idUser, dataUser } = useSelector(state => state.user)
  const [msgBLPrint, setMsgBLPrint] = useState("Add")
  const [msgVLPrint, setMsgvLPrint] = useState("Add")
  const [rateValue, setRateValue] = useState(currentPlace.rating.valueOfRating)
  const [reviews, setReviews] = useState(currentPlace.rating.nbEval)
  const [iconLike, setIconLike] = useState(ic_favorite_border)
  const [likesnb, seLikeNb] = useState(currentPlace.likes.length)
  const [disabled, setDisabled] = useState(false)
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${tokenUser}`,
  };
  //likes in this place
  useEffect(() => {
    if (currentPlace.likes.includes(idUser)) {
      setIconLike(ic_favorite)
    } else {
      setIconLike(ic_favorite_border)
    }
  }, [idUser, currentPlace.likes])
  //ckeck if print add or detelet in bucketlist button 
  useEffect(() => {
    const verif = async () => {
      for await (const place of dataUser.bucketList) {
        if (place._id === currentPlace._id) {
          setMsgBLPrint("delete")
        } else {
          setMsgBLPrint("Add")
        }
      }
    }
    verif()
  }, [idUser, currentPlace, dataUser])
  //ckeck if print add or detelet in visited  button 
  useEffect(() => {
    const verif = async () => {
      for await (const place of dataUser.visitedList) {
        if (place._id === currentPlace._id) {
          setMsgvLPrint("Delete")
        } else { setMsgvLPrint("Add") }
      }
    }
    verif()
  }, [idUser, currentPlace, dataUser])
  useEffect(() => {
    if (msgVLPrint === "Delete") {
      setDisabled(true)
    }
  }, [msgVLPrint])

  const handleLike = async () => {
    var message
    handleLikeAction(idUser,id,headers).then((res)=>{
      if(res.valueLike===true){
        setIconLike(ic_favorite)
        message = { action: `like  ${currentPlace}`, idUser: idUser, userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}`, idPlace: currentPlace._id, placeName: currentPlace, }
      }else{
        setIconLike(ic_favorite_border)
        message = { action: `dislike  ${currentPlace}`, idUser: idUser, userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}`, idPlace: currentPlace._id, placeName: currentPlace, }
      }
      loggerComponent(message)
      seLikeNb(res.likeLength)
    })
    
  }
  const handleBucketList = async () => {
    let message
    if (msgBLPrint === "Add") {
      bucketListAdd(idUser,id,headers).then((res)=>{
        dispatch(setBucketList(res.bucketList))
        dispatch(userChangeValue(res))
      })
      message = { action: `add ${currentPlace.name.toLowerCase()} to bucket list `, idUser: idUser, userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}`, idPlace: currentPlace._id, placeName: currentPlace.name.toLowerCase(), }
      loggerComponent(message)
      setMsgBLPrint("Delete")

    } else {
      bucketListDelete(idUser,id,headers).then((res)=>{
        dispatch(setBucketList(res.bucketList))
        dispatch(userChangeValue(res))
      })
      message = { action: `delete ${currentPlace.name.toLowerCase()} from bucket list `, idUser: idUser, userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}`, idPlace: currentPlace._id, placeName: currentPlace.name.toLowerCase(), }
      loggerComponent(message)
      setMsgBLPrint("Add")
    }
  }
  const handleVisitedtList = async () => {
    let message
    if (msgVLPrint === "Add") {
      visitedListAdd(idUser,id,headers).then((res)=>{
        dispatch(setVisitedList(res.visitedList))
        dispatch(setBucketList(res.bucketList))
        dispatch(userChangeValue(res))
      }) 
      message = { action: `add ${currentPlace.name.toLowerCase()} to visited list `, idUser: idUser, userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}`, idPlace: currentPlace._id, placeName: currentPlace.name.toLowerCase(), }
      loggerComponent(message)
      setMsgvLPrint("Delete")
    } else {
      visitedListDelete(idUser,id,headers).then(res=>{
        dispatch(setVisitedList(res.visitedList))
        dispatch(userChangeValue(res))
      })        
      message = { action: `delete ${currentPlace.name.toLowerCase()} from visited list `, idUser: idUser, userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}`, idPlace: currentPlace._id, placeName: currentPlace.name.toLowerCase(), }
      loggerComponent(message)
      setMsgvLPrint("Add")
      setDisabled(false)
    }
  }
 //add - update rate
const handleRate = async (event, newvalue) => {
  ratePlace(id, newvalue, headers).then((res) => {
    dispatch(setRate(res.ratesGet))
    setRateValue(res.result.rating.valueOfRating)
    setReviews(res.result.rating.nbEval)
    dispatch(setPlace(res.placesGet))
  })
  let newNamePlace = currentPlace.name.toLowerCase()
  var message = { action: `add a rate to ${newNamePlace} page`, idUser: idUser, userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}`, idPlace: currentPlace._id, placeName: newNamePlace, }
  loggerComponent(message)
  forceUpdate()
}
//delete rate
const deleteRate = async () => {
  if (currentPlace.rating.valueOfRating !== 0) {
    ratePlace(id, 0, headers).then((res) => {
      dispatch(setRate(res.ratesGet))
      setRateValue(res.result.rating.valueOfRating)
      setReviews(res.result.rating.nbEval)
      dispatch(setPlace(res.placesGet))
    })
  let newNamePlace = currentPlace.name.toLowerCase()
  var message = { action: `add a rate to ${newNamePlace} page`, idUser: idUser, userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}`, idPlace: currentPlace._id, placeName: newNamePlace, }
  loggerComponent(message)
  forceUpdate()
  } else { toast.warn("you can't ,sorry", { position: "top-center", autoClose: 500, hideProgressBar: false, theme: "light" }); }
}
  return (
    <div className="card-box-place">
      <div className="card-place">
        <img src={currentPlace.pictures[0].url} alt="" onClick={() => {
          navigate(`/places/${id}`)
          let newNamePlace = currentPlace.name
          var message
          if (value === true) {
            message = { action: `access ${newNamePlace} page`, idUser: idUser, userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}`, idPlace: currentPlace._id, placeName: newNamePlace.toLowerCase(), }
          } else {
            message = { action: `access ${newNamePlace} page`, idPlace: currentPlace._id, paceName: newNamePlace.toLowerCase(), }
          }
          loggerComponent(message)
        }} />
        <div className="card-content-place">
          {value && <Icon icon={iconLike} style={{ color: "red", position: "absolute", top: "15px", right: "15px" }} size={35} onClick={handleLike}></Icon>}
          <h4>{currentPlace.name}</h4>
          <h6>{currentPlace.city.name}</h6>
          <div className='start-rate' style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "25px" }}>
            <div><Stack spacing={1}>
              {value ? <Rating name="half-rating" size="large" value={rateValue} precision={0.5} onChange={handleRate} /> :
                <Rating size="large" name="half-rating-read" defaultValue={rateValue} precision={0.5} readOnly />}
            </Stack></div>
            {value && < HighlightOffIcon onClick={deleteRate} />}
          </div>
          <div className='Rating-container'>
            <span>Rating : {rateValue} </span>
            <span>Reviews : {reviews} </span>
            <span>Likes : {likesnb} </span>
          </div>
          {value && <div className='btnsCard'>
            <div className='hoverContainer'>
              <span className='topHoverText'>{msgBLPrint}</span>
              <button disabled={disabled} onClick={handleBucketList} value={msgBLPrint}> Bucket List</button>
            </div>
            <div className='hoverContainer'>
              <span className='topHoverText'>{msgVLPrint}</span>
              <button onClick={handleVisitedtList} value={msgVLPrint} >Visited List</button>
            </div>
          </div>}
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
export default CardPlaces