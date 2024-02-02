import axios from 'axios';
const GetRates = async(activityId)=>{
    var rates
    axios.get("http://localhost:3002/api/rate/")
    .then((res) => {
        rates= res.data
    })
    return rates
}
export default GetRates
