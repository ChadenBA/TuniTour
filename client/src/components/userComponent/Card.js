import '../../Styles/Card-city.css'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import loggerComponent from '../../utils/logger'
import { useSelector } from 'react-redux'

function Card(props) {
  const navigate = useNavigate()
  const id = props.element._id
  const { value } = useSelector(state => state.login)
  const { idUser, dataUser } = useSelector(state => state.user)
  return (
    <div className="card-box-city"
      onClick={() => {
        navigate(`/cities/${id}`)
        var message
        if (value === true) {
          message = { action: ` ${props.element.name.toLowerCase()} page`, idUser: idUser, userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}`, idCity: id, cityName: props.element.name.toLowerCase(), }
        } else {
          message = { action: `access ${props.element.name.toLowerCase()} page`, idCity: id, cityName: props.element.name.toLowerCase(), }
        }
        loggerComponent(message)
      }}>
      <div className="card-city">
        <img src={props.element.pictures[0].url} alt="" />
        <div className="card-content-city">
          <h4>{props.element.name}</h4>
        </div>
      </div>
    </div>
  )
}

export default Card