import React from 'react'
import '../../Styles/agency.css'
import loggerComponent from '../../utils/logger'
import { useSelector } from 'react-redux'

function CardAgency(props) {
  const { value } = useSelector(state => state.login)
  const { idUser, dataUser } = useSelector(state => state.user)
  return (
    <div className='container-agency-card'>
      <a href={props.element.url} onClick={() => {
        var message
        if (value === true) {
          message = { action: `go to ${props.element.name} agency`, idUser: idUser, userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}`, }
        } else {
          message = { action: `user go to  ${props.element.name} agency` }
        }
        loggerComponent(message)
      }}>
        <div className="card-box-agency-user">
          <img src={props.element.picture.url} alt="" className='agency-pic' />
          <h2 className='title-card-agency'>{props.element.name}</h2>
          <div className='buttom-agency'></div>
        </div>
      </a>
    </div>
  )
}

export default CardAgency
