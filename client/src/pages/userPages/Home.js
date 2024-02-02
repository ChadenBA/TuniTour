/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import img2 from "../../Styles/images/architecture-antiquity-travel-panorama.jpg"
import img5 from "../../Styles/images/medina-de-tunis-YM594Z-udOA-unsplash.jpg"
import img6 from "../../Styles/images/pexels-helmy-zairy-15277297.jpg"
import img7 from "../../Styles/images/pexels-photo-3274752.jpeg"
import img8 from "../../Styles/images/pexels-photo-4408406.jpeg"
import img9 from "../../Styles/images/pexels-photo-6469821.jpeg"
import img10 from "../../Styles/images/pexels-photo-14809503.jpeg"
import React, { useEffect, useState } from 'react'
import "../../Styles/Home.css"
import Card from "../../components/userComponent/Card"
import CardPlaces from "../../components/userComponent/CardPlaces"
import { setActivities, setCategories, setPlace, setCities, setRate, setAgencies } from "../../features/PlaceSlice"
import { ToastContainer, toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux'
import { BallTriangle } from 'react-loader-spinner'
import CardActivities from "../../components/userComponent/CardActivities"
import CardAgency from '../../components/userComponent/CardAgency'
import "swiper/css";
import "swiper/css/free-mode"
import { Navigation, Scrollbar, A11y } from 'swiper';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode } from 'swiper';
import 'bootstrap/dist/css/bootstrap.min.css'
import SwiperCore, { Autoplay } from 'swiper/core'
import loggerComponent from '../../utils/logger'
import Footer from "../../components/userComponent/Footer"
import GetCategories from "../../redux/apiCalls/Gets/GetCategories"
import getActivities from "../../redux/apiCalls/Gets/GetActivties"
import GetCities from "../../redux/apiCalls/Gets/GetCities"
import GetAgencies from "../../redux/apiCalls/Gets/GetAgencies"
import GetPlaces from "../../redux/apiCalls/Gets/GetPlaces"
import GetRates from "../../redux/apiCalls/Gets/GetRates"

SwiperCore.use([Autoplay]);
function Home() {
  //declaration
  const dispatch = useDispatch()
  const { Places, Categories, Activities, Cities, Agencies, Rates } = useSelector(state => state.place)
  const { idUser, dataUser } = useSelector(state => state.user)
  const [indexCat, setIndex] = useState(Categories[0]?._id)
  const { value } = useSelector(state => state.login)

  //function
  //get categories
  useEffect(() => {
    GetCategories().then(res=>{
      dispatch(setCategories(res))    })
  }, [dispatch])
  //get activities
  useEffect(() => {
    getActivities().then(res=>{
      dispatch(setActivities(res))
    })
  }, [dispatch])
  //get cities
  useEffect(() => {
    GetCities().then(res=>{
      dispatch(setCities(res))
    })
  }, [dispatch])
  //get agencies
  useEffect(() => {
    GetAgencies().then(res=>{
      dispatch(setAgencies(res))
    })
  }, [dispatch])


  //get places
  useEffect(() => {
    GetPlaces().then(res=>{
      dispatch(setPlace(res))

    })
    const toplikes = async () => {
      if (Places.length !== 0) {
        var topPlace = Places[0]
        for await (const place of Places) {
          if (place.likes.length >= topPlace.likes.length) {
            topPlace = place
          }
        }
        const message = {
          action: `Top likes number ${topPlace.likes.length}`,
          placeName: topPlace.name.toLowerCase(),
          likesNumber: topPlace.likes.length.toString()
        }
        loggerComponent(message)
      }
    }
    const nameCategories = async (categories, placeName) => {
      for await (const category of categories) {
        const message = {
          action: `send places with categories`,
          placeName: placeName.toLowerCase(),
          categoryName: category.title.toLowerCase()
        }
        loggerComponent(message)
      }
    }
    const allplacesCategories = async () => {
      for await (const place of Places) {
        nameCategories(place.categories, place.name)
      }
    }

    toplikes()
    allplacesCategories()
  }, [dispatch])

  useEffect(() => {
    if (idUser) {
      GetRates().then(res=>{
        dispatch(setRate(res))
      })
    }
  }, [dispatch])
  const printPlacesWithCategoryNature = async (event) => {
    setIndex(event.currentTarget.id)
    var message
    if (value === true) {
      message = {
        action: `explores places that fall under ${event.target.value.toLowerCase()} categories.`,
        idUser: idUser,
        userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}`,
        idCategory: event.currentTarget.id,
        categoryName: event.target.value.toLowerCase()
      }
    } else {
      message = {
        action: `explores places that fall under ${event.target.value.toLowerCase()}  categories.`,
        idCategory: event.currentTarget.id,
        categoryName: event.target.value.toLowerCase()
      }
    }
    loggerComponent(message)
  };
  //  window.addEventListener('scroll', function() {
  //   var message
  //    if(value===true){
  //       message={action:`${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()} scrolled the home page `,
  //        idUser:idUser,
  //        userFullName:`${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}`,
  //       }
  //     }else{
  //       message={action:`someone scrolled the home page`,
  //     }
  //     } 
  //     loggerComponent(message)

  // });

  return (
    <div className='bg-color'>
      {Activities.length === 0 && Cities.length === 0 && Places.length === 0 && Rates.length === 0 && Agencies.length === 0 && Categories.length === 0 ?
        <span>
          <BallTriangle height={100} width={100} radius={5} color="#4fa94d" ariaLabel="ball-triangle-loading" wrapperClass={{}} wrapperStyle="" visible={true} />
        </span> :
        <div>
          <div className='home-Header'></div>
          <div className='home-page-places-categories'>
            <div className='btn-categories'>
              <Swiper modules={[Navigation, Scrollbar, A11y, FreeMode]} freeMode={true} breakpoints={{ 10: { slidesPerView: 1 }, 300: { slidesPerView: 1 }, 400: { slidesPerView: 1 }, 500: { slidesPerView: 2 }, 700: { slidesPerView: 3 }, 900: { slidesPerView: 4 }, 1200: { slidesPerView: 5 }, 1400: { slidesPerView: 6 } }} grabCursor={true} className="mySwiper" mousewheel={true} slidesPerView={6} navigation     >
                {Categories.map((item, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <button onClick={printPlacesWithCategoryNature} value={item.title} id={item._id}>
                        {item.title}
                      </button>
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            </div>
            <div className="Container-for-all">
              <div className='container-gallery'>
                <div className="gallery-title"><h4> TUNISIA <span>Places</span></h4></div>
              </div></div>
            <div className='print-places-home'>
              {Places && Places.map((item, index) => {
                for (var i = 0; i < item.categories.length; i++) {
                  if (item.categories[i]._id === indexCat) {
                    return (
                      <div key={index}>
                        <CardPlaces element={item} />
                      </div>
                    )
                  }
                }
              })}
            </div>
          </div>
          <div>
            <div className="Container-for-all">
              <div className='container-gallery'>
                <div className="gallery-title"><h4> TUNISIA <span>Cities</span></h4></div>
              </div></div>
            <div className='swiper-container-cards'>
              <div className='main-wrap-home'>
                <Swiper modules={[Navigation, Scrollbar, A11y, FreeMode]} freeMode={true} breakpoints={{ 0: { slidesPerView: 1, }, 800: { slidesPerView: 2, }, 1180: { slidesPerView: 3, }, 1550: { slidesPerView: 4 }, 1700: { slidesPerView: 4 } }} grabCursor={true} centeredSlides={false} className="mySwiper" mousewheel={true} slidesPerView={5} navigation    >
                  <div className="container-search-card">
                    {Cities && Cities.map((item, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <Card element={item} />
                        </SwiperSlide>
                      )
                    })}
                  </div>
                </Swiper>
              </div>
            </div>
          </div>
          <div className="Container-for-all">
            <div className='container-gallery'>
              <div className="gallery-title"><h4> TUNISIA <span>Gallery</span></h4></div>
              <div className='box-gallery'>
                <div className='dream-gallery'>
                  <img src="https://images.pexels.com/photos/6983523/pexels-photo-6983523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                  <img src="https://c4.wallpaperflare.com/wallpaper/831/591/766/sahara-desert-tunisia-wallpaper-preview.jpg" alt="" />
                  <img src={img10} alt="" />
                  <img src={img2} alt="" />
                  <img src={img6} alt="" />
                  <img src={img5} alt="" />
                </div>
                <div className='dream-gallery'>
                  <img src="https://images.pexels.com/photos/9424943/pexels-photo-9424943.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                  <img src={img7} alt="" />
                  <img src={img9} alt="" />
                  <img src={img8} alt="" />
                  <img src="https://images.pexels.com/photos/12305351/pexels-photo-12305351.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                </div>
                <div className='dream-gallery'>
                  <img src="https://c1.wallpaperflare.com/preview/462/999/644/tunisia-sidi-bou-sa%C3%AFd-bougainvillea-portal.jpg" alt="" />
                  <img src="https://c0.wallpaperflare.com/preview/648/745/294/tunis-sidi-bou-said-tunisia-holidays.jpg" alt="" />
                  <img src="https://images.pexels.com/photos/6469818/pexels-photo-6469818.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                  <img src="https://images.pexels.com/photos/8136613/pexels-photo-8136613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                  <img src="https://c4.wallpaperflare.com/wallpaper/68/616/996/5bd128613e2d8-wallpaper-preview.jpg" alt="" />
                  <img src="https://images.pexels.com/photos/12863447/pexels-photo-12863447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="Container-for-all">
            <div className='container-gallery'>
              <div className="gallery-title"><h4> TUNISIA <span>Activities</span></h4></div>
            </div></div>
          <div className='swiper-container-cards'>
            <Swiper modules={[Navigation, Scrollbar, A11y, FreeMode]} freeMode={true} breakpoints={{ 0: { slidesPerView: 1, }, 800: { slidesPerView: 2, }, 1150: { slidesPerView: 3 }, 1400: { slidesPerView: 4 }, 1600: { slidesPerView: 4 } }} grabCursor={true} centeredSlides={false} className="mySwiper" mousewheel={true} slidesPerView={4} navigation  >
              <div className="container-search-card">
                {Activities && Activities.map((item, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <CardActivities element={item} />
                    </SwiperSlide>
                  )
                })}
              </div>
            </Swiper>
          </div>
          <div className="Container-for-all">
            <div className='container-gallery'>
              <div className="gallery-title"><h4> TUNISIA <span>Agencies</span></h4></div>
            </div></div>
          <div className='agence-home-page'>
            <div className='swiper-container-cards'>
              <div className='main-wrap-home'>
                <div className='agences-Home'>
                  <Swiper modules={[Navigation, Scrollbar, A11y, FreeMode]} freeMode={true} breakpoints={{ 0: { slidesPerView: 1, },550: { slidesPerView: 2, }, 950: { slidesPerView: 3, }, 1350: { slidesPerView: 4, }, 1650: { slidesPerView: 5 }, 1400: { slidesPerView: 5 },}} grabCursor={true} centeredSlides={false} className="mySwiper" mousewheel={true} slidesPerView={6} navigation  >
                    {Agencies && Agencies.map((item, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <CardAgency element={item} />
                        </SwiperSlide>
                      )
                    })}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>}
      <ToastContainer />
    </div>
  )
}

export default Home
