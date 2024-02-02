import axios from 'axios';

const ratePlace = async (placeId,notice,headers) => {
    var ratesGet
    var placesGet
    var result
    await axios
    .post('http://localhost:3002/api/rate/rate-managment', { placeId, notice }, { headers: headers })
    .then(res => {
        result = res.data
    }).catch(error => {
    
    })
    await axios.get("http://localhost:3002/api/rate/")
    .then((res) => {
        ratesGet = res.data
    }).catch((error) => {  })

  await axios.get("http://localhost:3002/api/endroits/")
    .then((res) => {
        placesGet= res.data
    }).catch((error) => {
    })
    return {result,ratesGet,placesGet}
} 
export default ratePlace
