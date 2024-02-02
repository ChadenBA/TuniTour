import axios from 'axios';
const GetCities = async(id)=>{
    var cities
    await axios.get(`http://localhost:3002/api/cities/`)
    .then((res) => {
        cities=res.data
    })
    return cities
}
export default GetCities

