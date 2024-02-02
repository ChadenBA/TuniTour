import '../../Styles/navBar.css'
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { loginChangeValue } from '../../features/loginSlice'
import { userChangeValue, userChangeId, userChangeToken, setBucketList, setVisitedList } from "../../features/userSlice"
import { setRate } from "../../features/PlaceSlice"
import { Icon } from 'react-icons-kit'
import { search } from 'react-icons-kit/icomoon/search'
import PersonPinIcon from '@mui/icons-material/PersonPin';
import LogoutIcon from '@mui/icons-material/Logout';
import LastPageIcon from '@mui/icons-material/LastPage';
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined'; import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import loggerComponent from '../../utils/logger'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import KitesurfingOutlinedIcon from '@mui/icons-material/KitesurfingOutlined';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import LocationSearchingOutlinedIcon from '@mui/icons-material/LocationSearchingOutlined';
import SignpostOutlinedIcon from '@mui/icons-material/SignpostOutlined';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
export default function NavBar() {
  const { dataUser, idUser } = useSelector(state => state.user)
  const [mobile, setMobile] = useState(true)
  const { value } = useSelector(state => state.login)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  //FUNCTION
  const handleClick = () => {
    var message = { action: "logout", idUser: idUser, userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}` }
    loggerComponent(message)
    dispatch(loginChangeValue(!value))
    dispatch(userChangeValue({}))
    dispatch(userChangeId(null))
    dispatch(userChangeToken(""))
    dispatch(setRate([]))
    dispatch(setBucketList([]))
    dispatch(setVisitedList([]))
    navigate("/")
  }
  const handleNavBar = () => {
    setMobile(!mobile)
  }

  return (
    <div>
      <nav className='navBar'>
        <div className='logo' >
          <button className='mobile-menu-icon'>
            {!mobile ? <LastPageIcon onClick={handleNavBar} style={{ fontSize: 40, color: "gray" }} /> : <WidgetsOutlinedIcon style={{ fontSize: 35, color: "gray" }} onClick={handleNavBar} />}
          </button>
          <div className='logo-img' onClick={() => navigate("/")} />
          <h3 onClick={() => navigate("/")}>TuniTour</h3>
        </div>
        <div className={!mobile ? 'nav-Links-mobile' : 'nav-Links'}>
          <div className='links'>
            <div className='links_child'>
              <HomeOutlinedIcon />
              <Link to="/" className='home' onClick={() => {
                var message
                if (value === true) { message = { action: "access home page", idUser: idUser, userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}` } } else { message = { action: "access home page" } }
                setMobile(!mobile)
                loggerComponent(message)
              }}>
                <span>Home </span>
              </Link>
            </div>
            <div className='links_child'>
              <KitesurfingOutlinedIcon />
              <Link to="/activites" className='activites' onClick={() => {
                var message
                if (value === true) { message = { action: "access activities page", idUser: idUser, userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}` } } else { message = { action: " access activities page" } }
                setMobile(!mobile)
                loggerComponent(message)
              }}>
                <span>Activites</span>
              </Link>
            </div>
            <div className='links_child'>
              <MapsHomeWorkOutlinedIcon />
              <Link to="/cities" className='cities' onClick={() => {
                var message
                if (value === true) { message = { action: "access cities page", idUser: idUser, userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}` } } else { message = { action: "access cities page" } }
                setMobile(!mobile)
                loggerComponent(message)
              }}>
                <span>Cities</span>  </Link>
            </div>
            <div className='links_child'>
              <LocationSearchingOutlinedIcon />
              <Link to="/places" className='places' onClick={() => {
                var message
                if (value === true) {
                  message = { action: "access places page", idUser: idUser, userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}` }
                } else { message = { action: "access places page" } }
                setMobile(!mobile)
                loggerComponent(message)
              }}>
                <span>Places</span>
              </Link>
            </div>
            <div className='links_child'>
              <SignpostOutlinedIcon className='icon-nav-bar' />
              <Link to="/map" className='map' onClick={() => {
                var message
                if (value === true) { message = { action: "access map page", idUser: idUser, userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}` } } else { message = { action: "access map page" } }
                setMobile(!mobile)
                loggerComponent(message)
              }}>
                <span>Map</span>
              </Link>
            </div>
            {!value && <div className='links_child'>
              <MeetingRoomOutlinedIcon />
              <Link to="/signin" className="signin" onClick={() => {
                var message = { action: "access sign in page" }
                setMobile(!mobile)
                loggerComponent(message)
              }} >
                <span>Sign In </span>
              </Link>
            </div>}
            {!value && <div className='links_child'>
              <AppRegistrationIcon />
              <Link to="/signup" className="signup" onClick={() => {
                var message = { action: "access sign up page" }
                setMobile(!mobile)
                loggerComponent(message)
              }}>
                <span>Sign Up </span>
              </Link>
            </div>}
            {value && <div className='links_child'>
              <PersonPinIcon />
              <Link to="/profile" className="profileLink" onClick={() => {
                var message = { action: "access profile page", idUser: idUser, userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}` }
                setMobile(!mobile)
                loggerComponent(message)
              }}>
                <span> Profile</span>
              </Link>
            </div>}
            {value && <div className='links_child'><LogoutIcon /><button onClick={handleClick} className="btnLogOut" ><span>Sign Out</span> </button></div>}
            <Link to="/search" >
              <div className='box-search' onClick={() => {
                var message
                if (value === true) { message = { action: "access search page", idUser: idUser, userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}` } } else { message = { action: "access search page" } }
                setMobile(!mobile)
                loggerComponent(message)
              }}>
                <Icon icon={search} size={20} />
              </div>
            </Link>
          </div>
        </div>
      </nav>
    </div>)
}
