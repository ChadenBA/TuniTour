import axios from 'axios';
const GetCity = async(id)=>{
    var city
    await axios.get(`http://localhost:3002/api/cities/${id}`)
    .then((res) => {
        city=res.data
    })
    return city
}
export default GetCity

