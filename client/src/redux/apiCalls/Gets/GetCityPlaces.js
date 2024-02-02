import axios from 'axios';
const GetCityPlaces = async(id)=>{
    var cityPlaces
    await axios.get(`http://localhost:3002/api/endroits/city/${id}`)
    .then((res) => {
        cityPlaces=res.data
    })
    return cityPlaces
}
export default GetCityPlaces
