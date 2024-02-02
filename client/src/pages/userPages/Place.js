/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import Comments from '../../components/userComponent/Comments';
import { setComments } from "../../features/PlaceSlice"
import '../../Styles/place.css'
import { useNavigate } from 'react-router-dom'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode } from 'swiper';
import "swiper/css";
import "swiper/css/free-mode"
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'bootstrap/dist/css/bootstrap.min.css'
import { ToastContainer, toast } from 'react-toastify';
import loggerComponent from '../../utils/logger'
import { BallTriangle } from 'react-loader-spinner'
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Footer from "../../components/userComponent/Footer"
import ratePlace from '../../redux/apiCalls/ratePlace';
import { setRate } from "../../features/PlaceSlice"
import { setPlace } from "../../features/PlaceSlice"
import bucketListAdd from '../../redux/apiCalls/bucketListAdd';
import bucketListDelete from '../../redux/apiCalls/bucketListDelete';
import { setBucketList, setVisitedList, userChangeValue } from "../../features/userSlice"
import visitedListAdd from '../../redux/apiCalls/visitedListeAdd';
import visitedListDelete from '../../redux/apiCalls/visitedListDelete';
function Place() {
  const { id } = useParams()
  const placeId = id
  const dispatch = useDispatch()
  const [dataPlace, setDataPlace] = useState(null)
  const [text, setText] = useState("")
  const navigate = useNavigate()
  const [, forceUpdate] = useState();
  const { value } = useSelector(state => state.login)
  const { tokenUser, idUser, dataUser } = useSelector(state => state.user)
  const { comments } = useSelector(state => state.place)
  const [valRate, setValeRate] = useState(null)
  const [rateValue, setRateValue] = useState(null)
  const [reviews, setReviews] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [msgBLPrint, setMsgBLPrint] = useState("Add")
  const [msgVLPrint, setMsgvLPrint] = useState("Add")
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${tokenUser}`,
  };


  useEffect(() => {
    const getPLace = async () => {
      await axios.get(`http://localhost:3002/api/endroits/${id}`).then(res => {
        setDataPlace(res.data)
        setRateValue(res.data.rating.valueOfRating)
        setReviews(res.data.rating.nbEval)
      }).catch((error) => { })
    }
    getPLace()
  }, [id])
  
  useEffect(() => {
    const getComments = async () => {
      await axios.get("http://localhost:3002/api/comment/")
        .then((res) => {
          dispatch(setComments(res.data))
        }).catch(error => {
          toast.warn(error.response.data.message, { position: "top-center", autoClose: 1000, hideProgressBar: false, theme: "light", });
        })
    }
    getComments()
  }, [dispatch])

  const handleCmnts = async () => {
    await axios.post("http://localhost:3002/api/comment/add-comment", { placeId: dataPlace._id, text },
      { headers: headers })
      .then(res => {
      }).catch((error) => {
        toast.warn(error.response.data.message, { position: "top-center", autoClose: 1000, hideProgressBar: false, theme: "light", });
      })
    let message
    if (value === true) {
      message = { action: `add comments to ${dataPlace.name.toLowerCase()}  `, idUser: idUser, userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}`, idPlace: dataUser._id, placeName: dataPlace.name.toLowerCase(), }
    }
    loggerComponent(message)
    setText("")
    await axios.get("http://localhost:3002/api/comment")
      .then((res) => {
        dispatch(setComments(res.data))
      }).catch(error => {
        toast.warn(error.response.data.message, { position: "top-center", autoClose: 1000, hideProgressBar: false, theme: "light", });
      })
  }

  const getRate = async (activityId, rateV) => {
    await axios.get(`http://localhost:3002/api/rate/place/${placeId}/${activityId}`)
      .then((res) => {
        setValeRate(res.data)
      }).catch(error => {
        console.log(error.message)
      })
  }
  const handleBucketList = async () => {
    let message
    if (msgBLPrint === "Add") {
      bucketListAdd(idUser,id,headers).then((res)=>{
        dispatch(setBucketList(res.bucketList))
        dispatch(userChangeValue(res))
      })
      message = { action: `add ${dataPlace.name.toLowerCase()} to bucket list `, idUser: idUser, userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}`, idPlace: dataPlace._id, placeName: dataPlace.name.toLowerCase(), }
      loggerComponent(message)
      setMsgBLPrint("Delete")

    } else {
      bucketListDelete(idUser,id,headers).then((res)=>{
        dispatch(setBucketList(res.bucketList))
        dispatch(userChangeValue(res))
      })
      message = { action: `delete ${dataPlace.name.toLowerCase()} from bucket list `, idUser: idUser, userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}`, idPlace: dataPlace._id, placeName: dataPlace.name.toLowerCase(), }
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
      message = { action: `add ${dataPlace.name.toLowerCase()} to visited list `, idUser: idUser, userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}`, idPlace: dataPlace._id, placeName: dataPlace.name.toLowerCase(), }
      loggerComponent(message)
      setMsgvLPrint("Delete")
      setDisabled(true)
    } else {
      visitedListDelete(idUser,id,headers).then(res=>{
        dispatch(setVisitedList(res.visitedList))
        dispatch(userChangeValue(res))
      })        
      message = { action: `delete ${dataPlace.name.toLowerCase()} from visited list `, idUser: idUser, userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}`, idPlace: dataPlace._id, placeName: dataPlace.name.toLowerCase(), }
      loggerComponent(message)
      setMsgvLPrint("Add")
      setDisabled(false)
    }
  }
   const handleRate = async (event, newvalue) => {
      ratePlace(dataPlace._id, newvalue, headers).then((res) => {
       dispatch(setRate(res.ratesGet))
       setRateValue(res.result.rating.valueOfRating)
       setReviews(res.result.rating.nbEval)
       dataPlace.rating.valueOfRating=res.result.rating.valueOfRating
       dataPlace.rating.nbEval=res.result.nbEval
       dispatch(setPlace(res.placesGet))
    })
     var message = { action: `add a rate to ${dataPlace.name.toLowerCase()} page`, idUser: idUser, userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}`, idPlace: dataPlace._id, placeName: dataPlace.name.toLowerCase(), }
     loggerComponent(message)
     forceUpdate()
   }

   const deleteRate = async () => {
    if (dataPlace.rating.valueOfRating !== 0) {
      forceUpdate()
      ratePlace(id, 0, headers).then((res) => {
        dispatch(setRate(res.ratesGet))
        setRateValue(res.result.rating.valueOfRating)
        setReviews(res.result.rating.nbEval)
        dispatch(setPlace(res.placesGet))
      })
    let newNamePlace = dataPlace.name.toLowerCase()
    var message = { action: `add a rate to ${newNamePlace} page`, idUser: idUser, userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}`, idPlace: dataPlace._id, placeName: newNamePlace, }
    loggerComponent(message)
    } else { toast.warn("you can't ,sorry", { position: "top-center", autoClose: 500, hideProgressBar: false, theme: "light" }); }
  }

return (
  <div className='bg-color'>
    {dataPlace === null ?<span style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}><BallTriangle height={100} width={100} radius={5} color="#ADD8E6" ariaLabel="ball-triangle-loading" wrapperClass={{}} wrapperStyle="" visible={true} /></span> :
    <div>
      <div className='place-header'>
        <div className='place-title'>
          <div className='container-gallery'>
            <div className="gallery-title"><h4> {dataPlace.name} </h4></div>
          </div>
        </div>
      <div className='place-description'>
        <p>{dataPlace.description}</p>
        <div className='categories-place'>
         {dataPlace.categories.map((cat,index)=>{
          return(
            <span key={index}>{cat.title}</span>
          )})}
        </div>
      </div>
      <div className='swiper-city-imgs-container'>
        <div className='swiper-city-imgs'>
          <Swiper modules={[Navigation, Pagination, Scrollbar, A11y, FreeMode]} freeMode={true} breakpoints={{ 0: { slidesPerView: 1, }, 700: { slidesPerView: 1, }, 1150: { slidesPerView: 1, }, 1450: { slidesPerView: 1 }, 1700: { slidesPerView: 1 } }} grabCursor={true} centeredSlides={false} className="mySwiper" mousewheel={true} slidesPerView={1} pagination={{ clickable: true }} navigation   >
            {dataPlace.pictures.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                 <div className='imges-places' ><img src={item.url} alt="" />  </div>
                </SwiperSlide>
              )})}
          </Swiper>
        </div>
      </div>
    </div>
      {dataPlace.activities.length !== 0 && <h3 className="titleActivity">Activity you can do in {dataPlace.name} </h3>}
      {dataPlace.activities.length !== 0 && <div className='activityinplace'>
      {dataPlace.activities.map((item, index) => {
        const id = item._id
        const activityId = id
        getRate(activityId, item.rating.valueOfRating)
        return (
          <div className="card-box-place" key={index} >
            <div className="card-place"  >
            <img src={item.picture.url} alt="" onClick={() => {
            let message
          if (value === true) {
           message = { action: `navigate from ${dataPlace.name.toLowerCase()}  to  ${item.name.toLowerCase()} activity `, idUser: idUser, userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}`, idPlace: dataUser._id, placeName: dataPlace.name.toLowerCase(), idActivity: item._id, activityName: item.name.toLowerCase(), }
          } else {
            message = {
          action: `navigate from ${dataPlace.name.toLowerCase()}  to  ${item.name.toLowerCase()} activity `,idPlace: dataUser._id,placeName: dataPlace.name.toLowerCase(),idActivity: item._id,activityName: item.name.toLowerCase(),}
          }
          loggerComponent(message)
          navigate(`/activites/${id}`)
        }} />
        <div className="card-content-place">
          <h4>{item.name}</h4>
        </div>
      </div>
        <Stack spacing={1}>
          {value ? <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
            <Rating name="half-rating" size="large" value={item.rating.valueOfRating} precision={0.5} onChange={async (event, newvalue) => {
              const notice = newvalue
                await axios.post(`http://localhost:3002/api/rate/place/mangement-rate-activity`, { placeId, activityId, notice }, { headers: headers })
                .then((res) => {
                getRate(activityId)
               item.rating.valueOfRating = res.data.rating.valueOfRating
                }).catch(error => { console.log(error.message) })
                let message
                if (value === true) {
                message = {action: `rate ${item.name.toLowerCase()} activity  ${dataPlace.name.toLowerCase()}  `,idUser: idUser,  userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}`, idPlace: dataUser._id,  placeName: dataPlace.name.toLowerCase(),idActivity: item._id,activityName: item.name.toLowerCase(),}}
                loggerComponent(message)
              }} />
              <span>Rating : {item.rating.valueOfRating}</span>
            </div> :
          <div>
         <Rating size="large" name="half-rating-read" value={item.rating.valueOfRating} precision={0.5} readOnly />
            <span>{item.rating.valueOfRating}</span>
        </div>}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "10px" }}>
        {value && <div>
        <HighlightOffIcon size={18} onClick={async () => {
         const notice = 0
          await axios.post(`http://localhost:3002/api/rate/place/mangement-rate-activity`, { placeId, activityId, notice }, { headers: headers })
         .then((res) => {
            getRate(activityId)
             item.rating.valueOfRating = res.data.rating.valueOfRating
            }).catch(error => { console.log(error.message) })
          let message
          if (value === true) {
            message = {action: `delete ${item.name.toLowerCase()} activity  ${dataPlace.name.toLowerCase()}  `,idUser: idUser, userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}`, idPlace: dataUser._id, placeName: dataPlace.name.toLowerCase(), idActivity: item._id, activityName: item.name.toLowerCase(),}}
            loggerComponent(message)
            window.location.reload()
          }} />
        </div>}
        </div>
      </Stack>
    </div>)
    })}
    </div>}
     <div className='cmnts'>
       <div className='cmnts-container'>
         <div className='rates-commnts-page'>
          <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start",gap:"10px"}}>
          <div><Stack spacing={1}>
            {value ? <Rating name="half-rating" size="large" value={rateValue} precision={0.5}  onChange={handleRate} /> :
              <Rating size="large" name="half-rating-read" precision={0.5} value={rateValue} readOnly />}
            </Stack>
          </div>
         {value && <HighlightOffIcon onClick={deleteRate}/>}
        </div>  
        <span>Rating : {rateValue} </span>
        <span>Reviews : {reviews} </span>
        <span>Likes : {dataPlace.likes.length} </span>
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
        <div className='list-comnts'>
          {value && <div className='add-cmnt-container'>
          <input className='add-cmnt' type="text" placeholder='write a comment...' value={text} onChange={(e) => { setText(e.target.value) }} />
          <button onClick={handleCmnts}>Add</button>
        </div>}
        {comments.map((item, index) => {
          let editComments;
          if (idUser) { editComments = idUser === item.user._id ? true : false; }
          if (item.placeId === dataPlace.id)
          return (<Comments cmntr={item} dataPlace={dataPlace} edit={editComments} key={index} />)
        })}
        </div>
      </div>
    </div>
  <ToastContainer />
</div>}
<Footer />
</div>)
}

export default Place
