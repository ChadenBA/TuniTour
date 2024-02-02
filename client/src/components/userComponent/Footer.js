import React from 'react'
import "../../Styles/footer.css"
import DiamondIcon from '@mui/icons-material/Diamond';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import log from "../../Styles/images/TuniTour-removebg-preview.png"
function Footer() {
  return (
    <div className='footer'>
      <div className='company-name'>
        <div>
          <DiamondIcon className='icon-footer' />
          <span>COMPANY NAME</span>
        </div>
        <div className='desc-company'>
          Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page
        </div>
      </div>
      <div className='folow-us'>
        <img src={log} style={{ height: '250px', width: '200px' }} alt="" />
        <span>Around the web</span>
        <div>
          <FacebookIcon className='icon-footer' />
          <InstagramIcon className='icon-footer' />
          <GoogleIcon className='icon-footer' />
          <TwitterIcon className='icon-footer' />
        </div>
      </div>
      <div className='contact-us'>
        <span>Contact</span>
        <div className='desc-company'>
          <LocationOnIcon className='icon-footer' />
          <span>Monastir, Tunisia</span>
        </div>
        <div className='desc-company'>
          <AlternateEmailIcon className='icon-footer' />
          <span>ttour@gmail.com</span>
        </div>
        <div className='desc-company'>
          <PhoneIcon className='icon-footer' />
          <span>+216 11 222 333</span>
        </div>
      </div>
    </div>
  )
}

export default Footer
