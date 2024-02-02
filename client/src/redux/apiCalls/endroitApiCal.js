
import request  from '../../utils/request'
import { toast } from "react-toastify"
import { endroitAction } from '../slices/endroitSlice';


// get endroit 
export function fetchEndroit(){
    return async(dispatch)=>{
        try{

        const {data}=await request.get(`api/endroits/`);
        dispatch(endroitAction.setEndroits(data))
        }catch(error){
           toast.error(error.response.data.message)
      
        }

    }
}

//get endroit count 
export function getEndroitCount(){
    return async(dispatch)=>{
        try{

        const {data}=await request.get(`api/endroits/admin/count`);
        dispatch(endroitAction.setEndroitCount(data))
        }catch(error){
           toast.error(error.response.data.message)
      
        }

    }
}

//fetch endroit based on category 
export function fetchEndroitBasedCategory(category){
    return async(dispatch)=>{
        try{

        const {data}=await request.get(`api/admin/endroits?category=${category}`);
        dispatch(endroitAction.setEndroitCategory(data))
        }catch(error){
           toast.error(error.response.data.message)
      
        }

    }
}


//create endroit 
export function createEndroit(newEndroit){
    return async(dispatch , getState)=>{
        try{
        dispatch(endroitAction.setLoading())
        await request.post(`api/endroits/admin` , newEndroit,{
            headers:{
                Authorization: "Bearer " + getState().auth.admin.data.token,
                "Content-Type":"multipart/form-data"
            } 
        });
        dispatch(endroitAction.setIsEndroitCreated())//put it ro true
        dispatch(fetchEndroit())
        toast.success("place created successfully")
        // after 2 seconsd we set it to false to return to the page
        setTimeout(()=>dispatch(endroitAction.clearIsEndroitCreated()),2000)//2 second
        }catch(error){
            console.log(error.response)
           dispatch(endroitAction.clearLoading())
         toast.error(error.response.data.message)
      
        }

    }
}


//update endroit picture 
export function updateEndroitPicture(newImage,EndroitId, imageId){
    return async(dispatch , getState)=>{
        try{
      
    await request.put(`api/endroits/admin/update-image/${EndroitId}/${imageId}` , newImage,{
            headers:{
                Authorization: "Bearer " + getState().auth.admin.data.token,
                "Content-Type":"multipart/form-data"
            } 
        });
        dispatch(fetchEndroit())
       toast.success("new place image uploaded successfully")
        }catch(error){
         toast.error(error.response.data.message)
         console.log(error.response)
        }

    }
}


//update endroit 
export function updateEndoit(newEndroit,EndroitId){
    return async(dispatch , getState)=>{
        try{
      
  const {data}=  await request.put(`api/endroits/admin/${EndroitId}` , newEndroit,{
            headers:{
                Authorization: "Bearer " + getState().auth.admin.data.token,           
            } 
        });
        dispatch(endroitAction.setEndroit(data))
        dispatch(fetchEndroit())
        toast.success("place updated successfully")
        }catch(error){
        toast.error(error.response.data.message)
        
        }

    }
}


//delete endroit 
export function deleteEndoit(EndroitId){
    return async(dispatch , getState)=>{
        try{
      
  const {data}=  await request.delete(`api/endroits/admin/${EndroitId}`,{
            headers:{
                Authorization: "Bearer " + getState().auth.admin.data.token,
              
            } 
        });
        dispatch(fetchEndroit())
        dispatch(endroitAction.deleteEndroit(data.EndroitId))
        toast.success("place deleted successfully")
        }catch(error){
        toast.error(error.response.data.message)
        
        }

    }
}

//delete image
export function deleteImage(EndroitId , imageId){
    return async(dispatch , getState)=>{
        try{
      
  const {data}=  await request.delete(`api/endroits/admin/update-image/${EndroitId}/${imageId}`,{
            headers:{
                Authorization: "Bearer " + getState().auth.admin.data.token,
              
            } 
        });
        dispatch(endroitAction.deleteEndroit(data.EndroitId))
        dispatch(fetchEndroit())
        toast.success("image deleted successfully")
        }catch(error){
            
            toast.error(error.response.data.message)
        
        }

    }
}

//fetch single endroit 
 
export function fetchSingleendroit(endroitId){
    return async(dispatch)=>{
        try{

        const {data}=await request.get(`api/endroits/admin/${endroitId}`);
        dispatch(endroitAction.setEndroit(data))
        }catch(error){
           toast.error(error.response.data.message)
      
        }

    }
}










