import React from 'react'
import { BallTriangle } from 'react-loader-spinner'
import { useSelector } from 'react-redux'
import CardPlaces from "../../components/userComponent/CardPlaces"
import Footer from "../../components/userComponent/Footer"
import GetPlaces from '../../redux/apiCalls/Gets/GetPlaces'
import { setPlace } from '../../features/PlaceSlice'
import { useDispatch } from 'react-redux'
function Places() {
    const dispatch = useDispatch()
    const { Places } = useSelector(state => state.place)
    GetPlaces().then(res=>{
        dispatch(setPlace(res))
  
      })
    return (
        <div className='bg-color'>
            {Places !== null ?
                <div className='PLaces-page'>
                    <div className='container-gallery'>
                        <div className="gallery-title"><h4> TUNISIA <span>Places</span></h4></div>
                    </div>
                    <div className='print-places-home'>
                        {Places.map((item, index) => {
                            return (
                                <div key={index}>
                                    <CardPlaces element={item} />
                                </div>
                            )
                        })}
                    </div>
                </div>
                : <span style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
                    <BallTriangle height={100} width={100} radius={5} color="#ADD8E6" ariaLabel="ball-triangle-loading" wrapperClass={{}} wrapperStyle="" visible={true} />
                </span>}
            <Footer />
        </div>
    )
}
export default Places
