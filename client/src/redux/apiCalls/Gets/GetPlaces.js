import axios from 'axios';
const GetPlaces = async(activityId)=>{
    var places
    await axios.get("http://localhost:3002/api/endroits/")
    .then((res) => {
        places= res.data
    })
    return places
}
export default GetPlaces
