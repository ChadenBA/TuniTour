import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {toast , ToastContainer} from 'react-toastify';
import{Link, useParams} from "react-router-dom"
import '../../Styles/login.css'
import { getRessetpassword, Ressetpassword } from "../../redux/apiCalls/passwordApiCall";
const Resetpwd=()=>{

       const dispatch=useDispatch();
       const {isError}=useSelector(state=>state.password)
        const {adminId, token}=useParams()
        //console.log(adminId, token)
       const [password , setPassword]=useState()
    
      
// Run the function getressetpassword 
useEffect(()=>{
   dispatch(getRessetpassword(adminId,token))
 
},[adminId,token])
 
// form submit handler 
const handleSubmit=async(e)=>{
    e.preventDefault();
     if(password.trim()==="")return toast.error("password required");
     console.log(adminId , token)
   dispatch(Ressetpassword(password,{adminId,token}))
   
}
return(
    <div className="styles_login_container">
        <ToastContainer theme="colored" position="top-center"/>
       {/* si erreur il neut peut pas voir la form */}
       {isError === false? (<h1>Not Found </h1>) :(
       <>
       
       <div className="styles_reset_form"> 
       <div className="inputs"> 
       <form onSubmit={handleSubmit} className="reset-form">
       <h1>Reset Password </h1>

       <input type="password" 
              placeholder="enter your new password"
              value={password}
              name="mdp" onChange={(e)=>setPassword(e.target.value)} 
              id="password"
              required></input>
              <div className="butnpart">
           <button type="submit" className="btn" >Submit </button> 
       <Link  className="loglink" to="/admin/adminlogin">login</Link>
       </div>
       </form>
       </div>
   </div>
       </>)}
</div>
)}
export default Resetpwd;