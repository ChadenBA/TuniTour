import { useState } from "react";
import { useDispatch } from "react-redux";
import {toast , ToastContainer} from 'react-toastify';
import { forgotpassword } from "../../redux/apiCalls/passwordApiCall";
import '../../Styles/login.css'
const ForgotPwd=()=>{

const [email , setEmail] =useState()

const dispatch=useDispatch()
// form submit handler 
const handleSubmit=async(e)=>{
    e.preventDefault();
    
    if(email.trim()==="")return toast.error("email required");
   
   dispatch(forgotpassword(email))
   
}
return(
    <div className="styles_login_container">
         <ToastContainer theme="colored" position="top-center"/>
    <div className="styles_login_form"> 
        <div className="inputs"> 
        <form onSubmit={handleSubmit} className="loginform">
        <h1>Forgot Password </h1>
        <label>Email </label>
        <input type="email" 
               placeholder="exmple@"
               name="email"
               id="email"
              onChange={(e)=>setEmail(e.target.value)}
                value={email || ""}
               required></input>
             
    
        <button type="submit" className="btn" >Submit</button> 
        </form>        
               </div>
    </div>

</div>
)

}
export default ForgotPwd;