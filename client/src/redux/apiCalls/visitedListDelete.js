import axios from 'axios';

const visitedListDelete= async (idUser,id,headers) => {
    var user
    await axios.put(`http://localhost:3002/api/tunitour/users/profile/${idUser}/visited-list/delete`, { id }, { headers: headers })
    await axios.get(`http://localhost:3002/api/tunitour/users/profile/${idUser}`).then((response) => {
        user=response.data
    })
    return user
} 
export default visitedListDelete
