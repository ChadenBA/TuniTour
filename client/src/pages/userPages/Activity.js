import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CardPlaces from '../../components/userComponent/CardPlaces'
import Rating from '@mui/material/Rating';
import { BallTriangle } from 'react-loader-spinner'
import Footer from "../../components/userComponent/Footer"
import GetActivity from '../../redux/apiCalls/Gets/GetActivity';
import getActivityPlaces from '../../redux/apiCalls/Gets/GetActivityPlaces';
import GetRatesActivity from '../../redux/apiCalls/Gets/GetRatesActivity';
export default function Activity() {
  const { id } = useParams()
  const activityId = id
  const [activity, setActivity] = useState(null)
  const [places, setPlaces] = useState(null)
  const [tableRate, setTableRate] = useState([])

  useEffect(() => {
    GetActivity(id).then(res=>{
      setActivity(res)
    })
  }, [id])

  useEffect(() => {
    getActivityPlaces(id).then(res=>{
      setPlaces(res)
    })
  }, [id])
  useEffect(() => {
    GetRatesActivity(activityId).then(res=>{
      setTableRate(res)
    })
    
  }, [activityId])
  return (
    <div className='bg-color'>
      {activity !== null && places !== null ?
        <div>
          <div className='Header-activity-container' style={{ backgroundImage: `url(${activity.picture.url})` }}>
          </div>
          <div className='activity-content-header'>
            <h1>{activity.name}</h1>
            <p>{activity.description}</p>
            <div className='rating-in-activity-page'>
              <Rating size="large" name="half-rating-read" value={activity.rating.valueOfRating} precision={0.5} readOnly />
              <div className='ReviewsRateAct'>Reviews : {activity.rating.nbEval} </div>
            </div>
          </div>
          {places.length !== 0 && <div className='activity-places-card-conatiner'>
            <h4>Tunisian places, where you can practice {activity.name.toUpperCase()} activity</h4>
            <div className='activity-places-card'>
              {places.map((item, index) => {
                return (
                  <div className='activity-places-card-rate' key={index} >
                    <CardPlaces element={item} />
                  </div>
                )
              })}
            </div>
          </div>}
          {tableRate.length !== 0 && <div className='tableDiv-container'>
            <div className='tabelDiv'>
              <table><tbody>
                <tr>
                  <th>Place</th>
                  <th className='td-center'>Rate</th>
                </tr>
                {tableRate.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.placeName}</td>
                      <td className='td-center'>{item.moyenne}</td>
                    </tr>)
                })}
              </tbody></table>
            </div>
          </div>}
        </div>
        : <span style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
          <BallTriangle height={100} width={100} radius={5} color="#ADD8E6" ariaLabel="ball-triangle-loading" wrapperClass={{}} wrapperStyle="" visible={true} />
        </span>}
      <Footer />
    </div>
  )
}