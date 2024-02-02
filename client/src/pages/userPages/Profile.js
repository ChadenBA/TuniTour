import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import '../../Styles/userProfile.css'
import { useNavigate } from 'react-router-dom'
import { Navigation, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode } from 'swiper';
import "swiper/css";
import "swiper/css/free-mode"
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'bootstrap/dist/css/bootstrap.min.css'
import CardPlaces from '../../components/userComponent/CardPlaces';
import { loginChangeValue } from '../../features/loginSlice'
import { userChangeValue, userChangeId, userChangeToken, setBucketList, setVisitedList } from "../../features/userSlice"
import { setRate } from "../../features/PlaceSlice"
import DeleteAccount from '../../redux/apiCalls/Deletes/DeleteAcount';

export default function ProfilePage() {
  const navigate = useNavigate()
  const handleEdit = () => {
    navigate("/profile/edit-profile")
  }
  const dispatch = useDispatch()
  const { dataUser, tokenUser, idUser } = useSelector(state => state.user)
  const { value } = useSelector(state => state.login)

  const handleClick = () => {
    dispatch(loginChangeValue(!value))
    dispatch(userChangeValue({}))
    dispatch(userChangeId(null))
    dispatch(userChangeToken(""))
    dispatch(setRate([]))
    dispatch(setBucketList([]))
    dispatch(setVisitedList([]))
    navigate("/")

  }
  //const [visible,setVisible]=useState(false)
  const deleteProfile = async () => {
    DeleteAccount(idUser,tokenUser)
    handleClick()
  }
  return (
    <div className='all-profile-user'>
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
          <div className='rigth-bar-bottom-user'>
            <div><span style={{ color: "#696969", fontSize: 25 }}> Bio </span> <div>{dataUser.bio} </div></div>
          </div>

        </div>
        <div className='left-bar-user'>
          <table><tbody>
            <tr>
              <td style={{ fontSize: 18 }}>First name </td>
              <td style={{ fontSize: 18, color: "#696969", textTransform: "capitalize" }}>{dataUser.firstName}</td>
            </tr>
            <tr>
              <td>Last name </td>
              <td style={{ fontSize: 18, color: "#696969", textTransform: "capitalize" }}>{dataUser.lastName}</td>
            </tr>
            <tr>
              <td> Nationality </td>
              <td style={{ fontSize: 18, color: "#696969", textTransform: "capitalize" }}> {dataUser.nationality}</td>
            </tr>
            <tr>
              <td>Adress </td>
              {dataUser.adress.length !== 0 ? <td style={{ fontSize: 18, color: "#696969", textTransform: "capitalize" }}>{dataUser.adress}</td> : <td style={{ fontSize: 18, color: "#C0C0C0", textTransform: "capitalize" }}>Emty field</td>}
            </tr>
            <tr>
              <td>Phone </td>
              {dataUser.phone.length !== 0 ? <td style={{ fontSize: 18, color: "#696969", textTransform: "capitalize" }}>{dataUser.phone}</td> : <td style={{ fontSize: 18, color: "#C0C0C0", textTransform: "capitalize" }}>Emty field</td>}
            </tr>
            <tr>
              <td>Age</td>
              {dataUser.age !== 0 ? <td style={{ fontSize: 18, color: "#696969", textTransform: "capitalize" }}>{dataUser.age}</td> : <td style={{ fontSize: 18, color: "#C0C0C0", textTransform: "capitalize" }}>Emty field</td>}
            </tr>
            <tr>
              <td>Email</td>
              <td style={{ fontSize: 18, color: "#696969" }}>{dataUser.email}</td>
            </tr>
          </tbody></table>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }} >
            <button className='left-user-edit' onClick={handleEdit}>Edit</button>
            <button className='left-user-edit' style={{ width: "180px" }} onClick={deleteProfile}>Delete account</button>
          </div>
        </div>
      </div>
      <div className='user-profile-content-list'>
        <div className='list-user-content'>
          <p style={{ margin: 15 }}><b>Bucket list : </b> it allows the user to create a personalized list of places they would like to visit. It's a way for our users to plan and keep track of their travel dreams.</p>
          <div>
            <div>
              <Swiper modules={[Navigation, Scrollbar, A11y, FreeMode]} freeMode={true} breakpoints={{ 700: { slidesPerView: 1, }, 1000: { slidesPerView: 2, }, 1500: { slidesPerView: 3, }, 1700: { slidesPerView: 3 } }} grabCursor={true} centeredSlides={false} className="mySwiper" mousewheel={true} slidesPerView={5} navigation spaceBetween={1}  >
                <div>
                  {dataUser.bucketList.length !== 0 ? dataUser.bucketList.map((item, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <CardPlaces element={item} />
                      </SwiperSlide>
                    )
                  })
                    : <h1 style={{ textAlign: "center" }}>Empty</h1>}
                </div>
              </Swiper>
            </div>
          </div>
        </div>
        <div className='list-user-content'>
          <p style={{ margin: 15 }}><b>Visited list : </b> The Visited list is a personalized list of places that a user has already visited. It lists the places that the user has had the chance to discover. It should be noted that places included in the Visited list are not part of the Bucket list, since the user has already had the opportunity to explore them.</p>
          <div>
            <div>
              <Swiper modules={[Navigation, Scrollbar, A11y, FreeMode]} freeMode={true} breakpoints={{ 700: { slidesPerView: 1, }, 1000: { slidesPerView: 2, }, 1500: { slidesPerView: 3, }, 1700: { slidesPerView: 3 } }} grabCursor={true} centeredSlides={false} className="mySwiper" mousewheel={true} slidesPerView={5} navigation spaceBetween={1}  >
                <div>
                  {dataUser.visitedList.length !== 0 ? dataUser.visitedList.map((item, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <CardPlaces element={item} />
                      </SwiperSlide>
                    )
                  }) : <h1 style={{ textAlign: "center" }}>Empty</h1>}
                </div>
              </Swiper>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

