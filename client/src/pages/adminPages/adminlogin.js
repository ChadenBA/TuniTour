import { useState } from "react";
import { Link ,Navigate , useNavigate}  from "react-router-dom";
import {toast , ToastContainer} from 'react-toastify';
import  '../../Styles/login.css'
import {useDispatch , useSelector } from 'react-redux'
import { loginAdmin } from "../../redux/apiCalls/authApiCalls";

const Login =()=>{
    const {admin}=useSelector(state=>state.auth)
    const navigate=useNavigate()

const [email , setEmail] =useState()
const [password , setPassword]=useState()
//we have to write all of our api call in despatch 
const dispatch=useDispatch()   

// form submit handler 
const handleSubmit=async(e)=>{
    e.preventDefault();
    
    if(email.trim()==="")return toast.error("email required");
    if(password.trim()==="")return toast.error("password required");
    // console.log({email,password})

     dispatch(loginAdmin({email , password}))
    if(email===email.admin && password===email.admin){
        navigate("/")
    }
   
}
return(
    <div className="styles_login_container">
         <ToastContainer theme="colored" position="top-center"/>
    <div className="styles_login_form"> 
    <div className="logo-bckg">  <img src="https://res-console.cloudinary.com/dxzlm2qqz/thumbnails/v1/image/upload/v1684355841/dWE5NmFtb2Jjbm5pbDJ3amtqamg=/preview" alt="logo" className="logo-tunitour" /> </div>
     
        <div className="inputs"> 
        <form onSubmit={handleSubmit} className="loginform">
        <h1>Admin Login </h1>
        <label>Email </label>
         <input className="inp" type="email" 
               placeholder="exmple@"
               name="email"
               id="email"
              onChange={(e)=>setEmail(e.target.value)}
                value={email || ''}
               required></input>
               <label>Password </label>
        <input className="inp" type="password" 
               placeholder="enter your password"
               name="mdp" onChange={(e)=>setPassword(e.target.value)} 
               id="password"
               required></input>
             

            {/* <div className='rememberPassword'>
                <input type="checkbox" className='checkbox'/>
                <label >Remember me?</label>
            </div> */}
        <button type="submit" className="btn" >Login</button> 
        
        <div className="forgetpwd"> 
        <a href='/admin/forgotpwd'> Froget Password ?</a>
    </div>
        </form>
        
       
       
               
               </div>
    </div>

</div>
)

}
export default Login;