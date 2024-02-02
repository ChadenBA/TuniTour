import axios from 'axios';
const DeleteAccount = async(idUser,tokenUser)=>{
    await axios.delete(`http://localhost:3002/api/tunitour/users/profile/delete/${idUser}`, {
        headers: {
          'Authorization': `Bearer ${tokenUser}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    )
}
export default DeleteAccount
