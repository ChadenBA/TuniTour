import axios from 'axios';

const handleLikeAction= async (idUser,id,headers) => {
    var valueLike
    var likeLength
    await axios.put(`http://localhost:3002/api/endroits/likes/${id}`, {}, { headers: headers })
      .then(async (res) => {
        if (res.data.likes.includes(idUser)) {
            valueLike=true
        }else{
            valueLike=false
        }
        likeLength=res.data.likes.length
    })

    return {valueLike,likeLength}
} 
export default handleLikeAction
