
import request  from '../../utils/request'
import { toast } from "react-toastify"
import { profileAction } from '../slices/profile.slice'
import { authAction } from '../slices/authslice';


// get admin  profile 
export function getAdminpofile(adminId){
    return async(dispatch)=>{
        try{
    
     //axios insted of fetch 
        const {data}=await request.get(`api/admin/adminProfile/${adminId}`);
        dispatch(profileAction.setProfile(data))
        }catch(error){
           toast.error(error.response.data.message)
      
        }

    }
}



// uoload profile picture
export function uploadProfilePhoto(newPhoto){
    return async(dispatch , getState)=>{
        try{
     //axios insted of fetch 
        const {data}=await request
         .post(`api/admin/adminProfile/profile-photo-upload`,newPhoto,{
            headers:{
                Authorization: "Bearer " + getState().auth.admin.data.token,
                "Content-Type":"multipart/form-data"
            } 
         });
        
          
         dispatch(profileAction.setProfilePicture(data.profilepicture))
         dispatch(authAction.setAdminPicture(data.profilepicture))
         toast.success("profile picture uploaded successfully")
          //modify the admin info in local storage with new image 
          const admin=JSON.parse(localStorage.getItem("adminInfo"))
          admin.profilepicture=data?.profilepicture;
          localStorage.setItem("userInfo",JSON.stringify(admin));

        }catch(error){
          toast.error(error)
      
        }

    }
}


// update  profile info 
export function updateProfile(adminId, profile){ 
    console.log(adminId)
    return async(dispatch , getState)=>{
        try{
     //axios insted of fetch 
        const {data}=await request
         .put(`api/admin/adminProfile/${adminId}`, 
          profile,{
            headers:{
            Authorization: "Baerer " + getState().auth.admin.data.token,
               
            } 
         });
        
          dispatch(profileAction.updateProfile(data))
          dispatch(authAction.setAdminname(data.adminname))
        toast.success("profile updated successfully")
          //modify the admin info in local storage  with new adminname 
           const admin=JSON.parse(localStorage.getItem("adminInfo"))
           admin.adminname=data?.adminname;
           localStorage.setItem("userInfo",JSON.stringify(admin))
      
        }catch(error){
         toast.error(error)
      
        }

    }
}



    


