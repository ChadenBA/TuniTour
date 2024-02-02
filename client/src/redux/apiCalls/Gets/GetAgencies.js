import axios from 'axios';
const GetAgencies= async(id)=>{
    var agencies
    await axios.get("http://localhost:3002/api/agencies")
    .then((res) => {
            agencies=res.data
    })
    return agencies
}
export default GetAgencies
