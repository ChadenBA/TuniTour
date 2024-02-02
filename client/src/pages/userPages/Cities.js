import React from 'react'
import "../../Styles/city.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import loggerComponent from '../../utils/logger'
import Footer from "../../components/userComponent/Footer"
import { setCities } from "../../features/PlaceSlice"
import GetCities from '../../redux/apiCalls/Gets/GetCities'
import { useDispatch } from 'react-redux'
export default function CitiesUser() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  GetCities().then(res=>{
    dispatch(setCities(res))
  })
  const { Cities } = useSelector(state => state.place)
  const { value } = useSelector(state => state.login)
  const { idUser, dataUser } = useSelector(state => state.user)
  return (
    <div className='bg-color'>
      <div className='HeaderCities'><div className='bg-image'><div className='overlay'></div></div></div>
      <div className='cities-container'>
        <p>The 24 cities of Tunisia offer a captivating blend of history, culture, and natural beauty. From the vibrant capital city of Tunis to the picturesque coastal town of Sidi Bou Said, each city has its own unique attractions that entice tourists from around the globe.<br /> In Tunis, visitors can explore the ancient Medina, a maze-like UNESCO World Heritage site filled with bustling markets, ornate mosques, and traditional architecture. The city also boasts modern districts with trendy cafes, art galleries, and a thriving nightlife scene.<br />Sidi Bou Said, with its whitewashed buildings adorned with blue accents, is a charming gem overlooking the Mediterranean Sea. Visitors can wander through its narrow streets, enjoy panoramic views from its cliffside cafes, and discover local art and crafts in its quaint boutiques.<br />
          Other cities like Carthage, Hammamet, and Sousse offer a mix of historical landmarks, pristine beaches, and lively waterfronts. Carthage showcases the ruins of an ancient civilization, while Hammamet entices with its golden sandy beaches and vibrant resort atmosphere. Sousse, with its UNESCO-listed Medina and impressive Great Mosque, invites travelers to delve into its rich history and cultural heritage.<br />
          Each city in Tunisia has its own distinct character and attractions, providing a diverse range of experiences for tourists. Whether you're seeking historical sites, stunning beaches, traditional markets, or culinary delights, the 24 cities of Tunisia offer a captivating journey through this North African country's treasures.<br />
        </p>
        <div className='all-cities' >
          {Cities && Cities.map((city, index) => {
            const id = city._id
            return (
              <div className="card-container" key={index}
                onClick={() => {
                  navigate(`/cities/${id}`)
                  var message
                  if (value === true) {
                    message = { action: `access ${city.name.toLowerCase()} page`, idUser: idUser, userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}`, idCity: id, cityName: city.name.toLowerCase(), }
                  } else { message = { action: `access ${city.name.toLowerCase()} page`, idCity: id, cityName: city.name.toLowerCase(), } }
                  loggerComponent(message)
                }}>
                <img src={city.pictures[1]?.url} alt="" />
                <div className="card-content">
                  <h3>{city.name}</h3>
                </div>
              </div>)
          })}
        </div>
      </div>
      <Footer />
    </div>
  )
}