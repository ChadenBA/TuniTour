import { passwordAction } from '../slices/paswordSlice'
import request  from '../../utils/request'
import { toast } from "react-toastify"


// forgot password 
export function forgotpassword(email){
    return async()=>{
        try{
    const data=await request.post("/api/admin/password/reset-password-link" ,{email})
    toast.success("Password reset link sent to your email, please check your email")
        }
        catch(error){
           toast.error(error.response.data.message)
          
        }

    }
}


// get resset password 
export function getRessetpassword(adminId,token){
    return async(dispatch)=>{
        try{
        await request.get(`/api/admin/password/reset-password-link/${adminId}/${token}`)
        }
        catch(error){
          dispatch(passwordAction.setError());
        }
    }
}


//resset  the password 
export function Ressetpassword(newPassword ,admin){
    return async()=>{
        try{
   const {data}=  await request.post(`/api/admin/password/reset-password-link/${admin.adminId}/${admin.token}`,{
        password:newPassword
     })

        toast.success(data.message)
        }catch(error){
            toast.error(error.response.data.message)
          
        }
    }
}