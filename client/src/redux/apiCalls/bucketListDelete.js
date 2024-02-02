import axios from 'axios';

const bucketListDelete = async (idUser,id,headers) => {
    var user
    await axios.put(`http://localhost:3002/api/tunitour/users/profile/${idUser}/bucket-list/delete`, { id }, { headers: headers })
    await axios.get(`http://localhost:3002/api/tunitour/users/profile/${idUser}`).then((response) => {
        user=response.data
    })
    return user
} 
export default bucketListDelete
