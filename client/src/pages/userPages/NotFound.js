import React from 'react'
import img from "../../Styles/images/PuXipAW3AXUzUJ4uYyxPKC-1200-80.jpg"

function NotFound() {
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",height:"90vh",width:"100%"}} >
      <img src={img} alt="not found"/>
    </div>
  )
}

export default NotFound
