
import request  from '../../utils/request'
import { toast } from "react-toastify"
import { activityAction } from '../slices/activitySlice';


// get activities
export function fetchActiviy(){
    return async(dispatch)=>{
        try{

        const {data}=await request.get(`api/activities`);
        dispatch(activityAction.setActivities(data))
        console.log(data)
        }catch(error){
           toast.error(error.response.data.message)
      
        }

    }
}

//get activity count 
export function getActivitiesCount(){
    return async(dispatch)=>{
        try{

        const {data}=await request.get(`api/activites/admin/count`);
        dispatch(activityAction.setActivityCount(data))
        }catch(error){
           toast.error(error.response.data.message)
      
        }

    }
}

//create activity
export function createAcivity(newActivity){
    return async(dispatch , getState)=>{
        try{
        dispatch(activityAction.setLoading())
        await request.post(`api/activities/admin` , newActivity,{
            headers:{
                Authorization: "Bearer " + getState().auth.admin.data.token,
                "Content-Type":"multipart/form-data"
            } 
        });
        dispatch(activityAction.setIsActivityCreated())//put it ro true
        dispatch(fetchActiviy());
        toast.success("activity created successfully")
        // after 2 seconsd we set it to false to return to the page
        setTimeout(()=>dispatch(activityAction.clearIsActivityCreated()),2000)//2 second
        }catch(error){
            console.log(error)
            dispatch(activityAction.clearLoading())
          toast.error(error.response.data.message)
      
        }

    }
}

//update activity picture 
export function updateActivityPicture(newImage,ActivityId){
    return async(dispatch ,getState)=>{
        try{
      
    await request.put(`/api/activities/admin/update-image/${ActivityId}` , newImage,{
            headers:{
                Authorization: "Bearer " + getState().auth.admin.data.token,
                "Content-Type":"multipart/form-data"
            } 
        });
       toast.success("new activity image uploaded successfully")
        }catch(error){
         toast.error(error.response.data.message)
        }

    }
}



//update activity
export function updateActivity(newActivity,ActivitytId){
    return async(dispatch , getState)=>{
        try{
      
  const {data}=  await request.put(`api/activities/admin/${ActivitytId}` , newActivity,{
            headers:{
                Authorization: "Bearer " + getState().auth.admin.data.token,  
            } 
        });
        dispatch(activityAction.setActivity(data))
        dispatch(fetchActiviy());
        toast.success("activity updated successfully")
        }catch(error){
        toast.error(error.response.data.message)
        
        }

    }
}


//delete activity
export function deleteActiivty(ActivityId){
    return async(dispatch , getState)=>{
        try{
      
  const {data}=  await request.delete(`api/activities/admin/${ActivityId}`,{
            headers:{
                Authorization: "Bearer " + getState().auth.admin.data.token,
              
            } 
        });
        dispatch(activityAction.deleteActivity(data.ActivityId))
        dispatch(fetchActiviy());
        toast.success("activity deleted successfully")
        }catch(error){
        toast.error(error.response.data.message)
        console.log(error)
        
        }

    }
}










