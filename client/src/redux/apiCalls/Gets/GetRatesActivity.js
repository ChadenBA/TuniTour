import axios from 'axios';
const GetRatesActivity = async(activityId)=>{
    var activityPlace
    await axios.get(`http://localhost:3002/api/rate/${activityId}`)
    .then((res) => {
        activityPlace= res.data
    })
    return activityPlace
}
export default GetRatesActivity
