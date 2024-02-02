import axios from 'axios';
const getActivityPlaces = async(id)=>{
    var activityPlace
    await axios.get(`http://localhost:3002/api/activities/places/${id}`)
    .then((res) => {
            activityPlace=res.data
    })
    return activityPlace
}
export default getActivityPlaces
