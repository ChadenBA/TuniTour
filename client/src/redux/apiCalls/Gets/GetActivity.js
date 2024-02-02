import axios from 'axios';
const getActivity = async(id)=>{
    var activity
    await axios.get(`http://localhost:3002/api/activities/${id}`)
        .then((res) => {
            activity=res.data
    })
    return activity
}
export default getActivity
