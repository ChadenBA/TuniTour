import { authAction } from '../slices/authslice'
import request  from '../../utils/request'
import { toast } from "react-toastify"


//login admin 
export function loginAdmin(admin){
    return async(dispatch)=>{
        try{
    //  const response = await fetch("http://localhost:8000/api/auth/adminLogin",{
    //     method:"POST",
    //     body:JSON.stringify(admin),
    //     headers:{
    //         "Content-Type":"application/json"
    //     }

    //  });
    //const data = await response.json();
     //axios isted of fetch 
    const data=await request.post("/api/admin/auth/adminLogin" , admin)
     localStorage.setItem("admininfo",JSON.stringify(data))
     dispatch(authAction.login(data))
        }catch(error){
           toast.error(error.response.data.message)
           console.log(error)
        }

    }
}
//logout admin 
export function logoutAdmin(admin){
    return (dispatch)=>{
        dispatch(authAction.logout());
        localStorage.removeItem("admininfo"); 
    }
}
