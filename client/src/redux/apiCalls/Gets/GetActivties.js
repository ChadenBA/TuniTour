import axios from 'axios';
const getActivities = async(id)=>{
    var activities
    await axios.get(`http://localhost:3002/api/activities/`)
        .then((res) => {
            activities=res.data
    })
    return activities
}
export default getActivities
