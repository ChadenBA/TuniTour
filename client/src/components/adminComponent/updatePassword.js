import React, { useState ,  useEffect } from 'react'
import Sidebar from "../../components/adminComponent/sidebar";
import{useNavigate}from "react-router-dom"
import { Icon } from 'react-icons-kit'
import {reply} from 'react-icons-kit/icomoon/reply'
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
import {eye} from 'react-icons-kit/feather/eye'


import request  from '../../utils/request'
import "../../Styles/security.css"
import axios from 'axios'

import { getAdminpofile, sendEmailcode } from "../../redux/apiCalls/profileApiCall";
import { useSelector,useDispatch } from 'react-redux'
import {UpdateEmail} from "../../features/userSlice"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { profileAction } from '../../redux/slices/profile.slice';

function Updatepass() {
    
    const {}=useSelector(state=>state.profile)
    const [email,setEmail]=useState("")
    const [viewCode,setViewCode]=useState(false)
    const [code ,setCode]=useState("")
    const navigate= useNavigate()
    const dispatch=useDispatch()

    const [oldPass,setOldPass]=useState("")
    const [newPass,setNewPass]=useState("")
    const [confirmPass,setConfirmPass]=useState("")

    const [inputTypeOld,setInputTypeOld]=useState("password")
    const [inputTypeNew,setInputTypeNew]=useState("password")
    const [inputTypeConf,setInputTypeConf]=useState("password")


    const [iconOld,setIconOld]=useState(eyeOff)
    const [iconNew,setIconNew]=useState(eyeOff)
    const [iconConf,setIconConf]=useState(eyeOff)


   
    const cancel=()=>{
        navigate("/admin/adminProfile")
    }

    const adminId = JSON.parse(localStorage.getItem('admininfo'));
   
// console.log(adminId.data._id)

       
    const formSubmitHnadler=async(e)=>{
        e.preventDefault();
        console.log(email)
        await request
        .post(`/api/admin/profile/${adminId.data._id}/security/email`,
         {email},{
             headers:{
                 Authorization: "Baerer " + adminId.data.token,
                    
         } 
        
         });
        
      setViewCode(!viewCode)
     
    }


    const validecode = async(e)=>{
        e.preventDefault();
        await request
        .put(`/api/admin/profile/${adminId.data._id}/security/valide-email`,
         {code},{
             headers:{
                 Authorization: "Baerer " + adminId.data.token,
            } 
         })
         setViewCode(viewCode)
        dispatch(profileAction.setemail(email))
        toast.success("check your email for the code ")
        setEmail("")
        setViewCode(false)
    }

    const changepwd =async(e)=>{
        e.preventDefault();
        if(oldPass==="" || newPass ==="" || confirmPass===""){
            toast.warn("please fill all mandatory fields.", {
                position: "top-center",autoClose: 1000,  hideProgressBar: false, progress: undefined,theme: "light",});
        }else{ 
           await request
           .put(`/api/admin/profile/${adminId.data._id}/security/password`,
            {oldPass,newPass,confirmPass},{
             headers:{
                 Authorization: "Baerer " + adminId.data.token,
            } 
         }).then((res)=>{
            setOldPass("")
            setNewPass("")
            setConfirmPass("")
            toast.success("email updated successfully", {
            position: "top-center", autoClose: 1000, hideProgressBar: false,progress: undefined, theme: "light", });
            }).catch((err)=>{
                toast.warn(err.response.data.message, {
                position: "top-center",autoClose: 1000,  hideProgressBar: false, progress: undefined,theme: "light",});
        })
    }}

    

    const oldVisibility=()=>{
        if(inputTypeOld==="password"){
            setIconOld(eye)
            setInputTypeOld("text")
        }else {
            setIconOld(eyeOff)
            setInputTypeOld("password")
        }
    }
    const newVisibility=()=>{
        if(inputTypeNew==="password"){
            setIconNew(eye)
            setInputTypeNew("text")
        }else {
            setIconNew(eyeOff)
            setInputTypeNew("password")
        }
    }
    const confVisibility=()=>{
        if(inputTypeConf==="password"){
            setIconConf(eye)
            setInputTypeConf("text")
        }else {
            setIconConf(eyeOff)
            setInputTypeConf("password")
        }
    }

  return (
    <div className='admin-profile
        ' >
      
       <Sidebar></Sidebar>
        <div className='main' >
            <div className="headerEdit">
                <Icon icon={reply} size={30} className="chevronLeft" onClick={cancel}/>
                <h3 className='titlePage'>change your email address and password</h3>
            </div>
            <div className='securityBody'>
                <div className='adminchangePassword'>
                    <h5>Password</h5>
                    <div className='pass-security'><input type={inputTypeOld} pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}" placeholder='old password' onChange={(e)=>{setOldPass(e.target.value)}}></input><Icon icon={iconOld} onClick={oldVisibility} /></div>
                    <div className='pass-security'><input type={inputTypeNew} pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}" placeholder='new password' onChange={(e)=>{setNewPass(e.target.value)}}></input><Icon icon={iconNew} onClick={newVisibility}/></div>
                    <div className='pass-security'><input type={inputTypeConf} pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}" placeholder='confirm new password' onChange={(e)=>{setConfirmPass(e.target.value)}}></input><Icon icon={iconConf} onClick={confVisibility}/></div>
                    <div><button onClick={changepwd} >change password</button></div>
                </div>
                <div className='changeEmail'>
                    <h5>Email</h5>
                    <div className='pass-security'>
                        <input type="email" placeholder={adminId.data.email} onChange={(e)=>{setEmail(e.target.value)}}></input>
                        <button onClick={formSubmitHnadler}>send code</button>
                    </div>
                    
                </div>

                {viewCode &&<div className='admincode'>
                    <h5>Code</h5>
                    <div className='pass-security'>
                        <input type="text" onChange={(e)=>{setCode(e.target.value)}} ></input>
                        <button onClick={validecode} >Validation</button>
                    </div>
                </div>}
            </div>
        </div>
        <ToastContainer />

    </div>
  )
}

export default Updatepass
