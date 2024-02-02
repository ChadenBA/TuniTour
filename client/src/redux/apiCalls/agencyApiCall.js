
import request  from '../../utils/request'
import { toast } from "react-toastify"
import {  agencyAction } from '../slices/agencySlice';


// get agencies
export function fetchAgency(){
    return async(dispatch)=>{
        try{

        const {data}=await request.get(`api/agencies`);
        dispatch(agencyAction.setAgencies(data))
        }catch(error){
           toast.error(error.response.data.message)
      
        }

    }
}

//get agencies count 
export function getAgenciesCount(){
    return async(dispatch)=>{
        try{

        const {data}=await request.get(`api/agencies/admin/count`);
        dispatch(agencyAction.setAgencyCount(data))
        }catch(error){
           toast.error(error.response.data.message)
      
        }

    }
}


//create agency
export function createAgency(newAgency){
    return async(dispatch , getState)=>{
        try{
        dispatch(agencyAction.setLoading())
        await request.post(`api/agencies/admin` , newAgency,{
            headers:{
                Authorization: "Bearer " + getState().auth.admin.data.token,
                "Content-Type":"multipart/form-data"
            } 
        });
        dispatch(agencyAction.setIsAgencyCreated())//put it ro true
        dispatch(fetchAgency())
        toast.success("agency created successfully")
        // after 2 seconsd we set it to false to return to the page
        setTimeout(()=>dispatch(agencyAction.clearIsAgencyCreated()),2000)//2 second
        }catch(error){
            console.log(error)
            dispatch(agencyAction.clearLoading())
            toast.error(error.response.data.message)
      
        }

    }
}

//update agency picture 
export function updateAgencyPicture(newImage,AgencyId){
    console.log(AgencyId)
    return async(dispatch , getState)=>{
        try{
      
    await request.put(`api/agencies/admin/update-image/${AgencyId}` , newImage,{
            headers:{
                Authorization: "Bearer " + getState().auth.admin.data.token,
                "Content-Type":"multipart/form-data"
            } 
        });
        dispatch(fetchAgency())
       toast.success("new agency image uploaded successfully")
        }catch(error){
         toast.error(error.response.data.message)
         console.log(error.response)
        }

    }
}


//update agency
export function updateAgency(newAgency,AgencytId){
    return async(dispatch , getState)=>{
        try{

            const {data}=  await request.put(`api/agencies/admin/${AgencytId}` , newAgency,{
                headers:{
                    Authorization: "Bearer " + getState().auth.admin.data.token,
                
                } 
            });
            dispatch(agencyAction.setAgency(data))
            dispatch(fetchAgency())
            toast.success("agency updated successfully")
            }catch(error){
            toast.error(error.response.data.message)
            
            }

    }
}


//delete agency
export function deleteAgency(AgencyId){
    return async(dispatch , getState)=>{
        try{
      
  const {data}=  await request.delete(`api/agencies/admin/${AgencyId}`,{
            headers:{
                Authorization: "Bearer " + getState().auth.admin.data.token,
              
            } 
        });
        dispatch(agencyAction.setAgency(data.AgencyId))
        dispatch(fetchAgency())
        toast.success("agency deleted successfully")
        }catch(error){
         toast.error(error.response.data.message)
        
        }

    }
}










