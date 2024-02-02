import "../../Styles/profile.css"
import React, { useEffect, useState } from "react";
import { useDispatch,useSelector} from "react-redux";
import { getAdminpofile, uploadProfilePhoto } from "../../redux/apiCalls/profileApiCall";
import { toast , ToastContainer} from "react-toastify";
import UpdateProfileComp from "../../components/adminComponent/updateprofile"
import Sidebar from "../../components/adminComponent/sidebar";



<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css"></link>
const AdminProfile = ()=>{
  const dispatch=useDispatch();
   const [file,setfile]=useState(null);
   const[updateProfile,setUpdateProfile]=useState(true);
   const {profile}= useSelector((state)=>state.profile)
  
   //get data from localstrorge
  const adminid = JSON.parse(localStorage.getItem('admininfo'));
  useEffect(()=>{
   dispatch(getAdminpofile(adminid.data._id))
   window.scrollTo(0,0);
   },[adminid.data._id]);
   
   
//form submit handler 
  const formSubmitHnadler=(e)=>{
    e.preventDefault();
    if(!file){
        return toast.warning("ther is no file")
    }
    const formData = new FormData();
    formData.append("image",file);
    dispatch(uploadProfilePhoto(formData))
  }   
 
    return(
              <section  className="admin-profile">
                 <ToastContainer theme="colored" position="top-center"/>
                 <section className="addminprofile">
        
          <Sidebar></Sidebar>
 <div className="main">
   <UpdateProfileComp  profile={profile} setUpdateProfile={setUpdateProfile}></UpdateProfileComp>
 </div>

 <div className="profie-header">
  <div className="couverture">
  <div className="profile-pic-wrapper">
             <img src={file ? URL.createObjectURL(file):profile?.profilepicture?.url}
            className="profile-pic"/>
        </div>
  </div>
        
        <form onSubmit={formSubmitHnadler}>
            <abbr title ="choose profile photo">
                <label htmlFor="file" className="bi bi-camera-fill uoload-profile-photo-icon"></label>
            </abbr>
            <input  style={{display:"none"}} 
            type ="file" 
            name ="file" 
            id="file"
            onChange={(e)=>setfile(e.target.files[0])}
            ></input>
            <button className="upload-profile-photo-btn" type="submit">upload</button>
        </form>
        
        <h1 className="adminname">{profile?.adminname && profile.adminname.toUpperCase()}</h1>
<h1 className="adminname">{profile?.lastname && profile.lastname.toUpperCase()}</h1>

<h6 className="profile_email" >{profile?.email}</h6> 
   
     <div className="bio-container">
  <h4 className="bio-title">BIO:</h4>
  
  <p className="profile_bio">{profile?.bio}</p>
</div>
     
       
       
        </div>
            
            </section>
              </section>
    ); 
}
export default AdminProfile;