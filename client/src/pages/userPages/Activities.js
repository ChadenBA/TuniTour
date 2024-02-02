/* eslint-disable no-unused-vars */
import React from 'react'
import '../../Styles/activities.css'
import { useDispatch, useSelector } from 'react-redux'
import CardActivities from '../../components/userComponent/CardActivities'
import Footer from "../../components/userComponent/Footer"
import getActivities from "../../redux/apiCalls/Gets/GetActivties"
import { setActivities } from "../../features/PlaceSlice"
import { Dispatch } from 'react'

export default function ActivitiesUser() {
  const dispatch =useDispatch()
  getActivities().then(res=>{
    dispatch(setActivities(res))
  })
  const { Activities } = useSelector(state => state.place)
  return (
    <div className='bg-color'>
      <div className='activities-header'>
        <div className="Container-for-all">
          <div className='container-gallery'>
            <div className="gallery-title"><h4> TUNISIA <span>Activities</span></h4></div>
          </div></div>
        <p>Tunisia is a paradise for outdoor enthusiasts, offering a myriad of activities to satisfy every adventurer's desires. Hiking enthusiasts can embark on thrilling treks through diverse landscapes, including the rugged mountains of the Atlas range or the stunning coastal cliffs of Cap Bon. Explore hidden trails, encounter unique flora and fauna, and be rewarded with breathtaking views at every turn.<br />

          For those seeking an exhilarating desert experience, Tunisia's vast Sahara Desert and the mesmerizing Chott el Djerid salt flats provide the perfect backdrop. Immerse yourself in the serenity of the desert as you traverse the golden sand dunes on a camel, marvel at the surreal landscapes, and camp under the starlit sky, creating memories that will last a lifetime.<br />

          Beyond hiking, desert exploration, and watersports, Tunisia offers a wealth of other activities to engage in. Explore ancient ruins and archaeological sites that bear witness to the country's rich history, indulge in traditional spa treatments and hammams for a pampering experience, or immerse yourself in the vibrant local culture through music, dance, and traditional festivals.<br />

          No matter what adventure you seek, Tunisia offers a diverse range of activities that will ignite your senses and leave you with unforgettable experiences in this captivating North African country.<br />
        </p>
      </div>

      <div className='print-activities-container'>
        {Activities.map((item, index) => {
          return (
            <div key={index}>
              <CardActivities element={item} />
            </div>
          )
        })}
      </div>
      <Footer />
    </div>
  )
}
