import React from 'react'
import '../../Styles/CardPlace.css'
import loggerComponent from '../../utils/logger'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Rating from '@mui/material/Rating';

function CardActivities(props) {
  const id = props.element._id
  const navigate = useNavigate()
  const { value } = useSelector(state => state.login)
  const { idUser, dataUser } = useSelector(state => state.user)
  return (
    <div className="card-box-activity" onClick={() => {
      navigate(`/activites/${id}`)
      let newNameAct = props.element.name
      var message
      if (value === true) {
        message = { action: `access ${newNameAct.toLowerCase()} page`, idUser: idUser, userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}`, idActivity: props.element._id, activityName: newNameAct.toLowerCase(), }
      } else {
        message = { action: `access ${newNameAct.toLowerCase()} page`, idActivity: props.element._id, activityName: newNameAct.toLowerCase(), }
      }
      loggerComponent(message)
    }}>
      <div className="card-activity">
        <img src={props.element.picture.url} alt="" />
        <div className="card-content-activity">
          <span>{props.element.name}</span>
        </div>
        <div className='Rating-container'>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
            <Rating size="large" name="half-rating-read" value={props.element.rating.valueOfRating} precision={0.5} readOnly />
            <span> Rating : {props.element.rating.valueOfRating}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardActivities

