import React, { useState, useEffect } from 'react'
import '../../Styles/city.css'
import '../../Styles/places.css'
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner'
import { useParams } from 'react-router-dom'
import CardPlaces from "../../components/userComponent/CardPlaces"
import "swiper/css";
import "swiper/css/free-mode"
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode } from 'swiper';
import Footer from "../../components/userComponent/Footer"
import GetCityPlaces from '../../redux/apiCalls/Gets/GetCityPlaces';
import GetCity from '../../redux/apiCalls/Gets/GetCity';

export default function City() {
  const [places, setPlaces] = useState(null)
  const [thisCity, setThisCity] = useState(null)
  const { id } = useParams()
  useEffect(() => {
    GetCity(id).then(res=>{
     setThisCity(res)
    })
  }, [id])
  useEffect(() => {
    GetCityPlaces(id).then(res=>{
      setPlaces(res)
    })
  })
  return (
    <div className='bg-color'>
      {thisCity !== null ?
        <div>
          <div className='HeaderCity' style={{ backgroundImage: `url(${thisCity.pictures[2].url})` }}>
          </div>
          <div className='cityDescription'>
            <h4> About  <span>{thisCity.name}</span> </h4>
            {thisCity.description}
          </div>
          <div className='swiper-city-imgs-container'>
            <div className='swiper-city-imgs'>
              <Swiper modules={[Navigation, Pagination, Scrollbar, A11y, FreeMode]}
                freeMode={true} grabCursor={true} centeredSlides={false} className="mySwiper" mousewheel={true}
                slidesPerView={1} navigation spaceBetween={1}  >
                {thisCity.pictures.map((item, index) => {
                  return (
                    <SwiperSlide key={index} >
                      <div className='imges-places'>
                        <img src={item.url} alt="" />
                      </div>
                    </SwiperSlide>
                  )
                }
                )}
              </Swiper>
            </div>
          </div>
          {places && places.length !== 0 ? <div className='cityPlaces' >
            <h4 className='h4-city'>Places in <span>{thisCity.name},</span> Tunisia </h4>
            <div className='print-places-cities'>
              {places && places.map((item, index) => {
                // eslint-disable-next-line no-unused-vars
                const id = places._id
                return (
                  <div key={index} >
                    <CardPlaces element={item} />
                  </div>
                )
              })}
            </div>
          </div> : <div>No places in this city</div>}
        </div> :
        <span style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
          <BallTriangle height={100} width={100} radius={5} color="#ADD8E6" ariaLabel="ball-triangle-loading" wrapperClass={{}} wrapperStyle="" visible={true} />
        </span>}
      <Footer />
    </div>
  )
}
