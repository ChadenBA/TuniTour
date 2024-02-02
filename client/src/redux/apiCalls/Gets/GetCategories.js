import axios from 'axios';
const GetCategories = async()=>{
    var categories
    await axios.get("http://localhost:3002/api/categories/")
    .then((res) => {
        categories=res.data
    })
    return categories
}
export default GetCategories

