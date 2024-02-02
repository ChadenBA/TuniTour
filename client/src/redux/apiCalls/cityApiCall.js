
import request  from '../../utils/request'
import { toast } from "react-toastify"
import { cityAction } from '../slices/citySlice';


// get city
export function fetchCities(){
    return async(dispatch)=>{
        try{
        const {data}=await request.get(`/api/cities`);
        dispatch(cityAction.setCities(data))

        }catch(error){
         toast.error(error.response.data.message)
          console.log(error)
      
        }
    }
}

//get city count 
export function getCityCount(){
    return async(dispatch)=>{
        try{

        const {data}=await request.get(`api/admin/cities/count`);
        dispatch(cityAction.setCityCount(data))
        }catch(error){
           toast.error(error.response.data.message)
      
        }

    }
}

//create city
export function createCity(newCity){
    return async(dispatch , getState)=>{
        try{
        dispatch(cityAction.setLoading())
        await request.post(`api/cities/admin` , newCity,{
            headers:{
                Authorization: "Bearer " + getState().auth.admin.data.token,
                "Content-Type":"multipart/form-data"
            } 
        });
        dispatch(cityAction.setIsCityCreated())//put it ro true
        dispatch(fetchCities())
        toast.success("city created successfully")
        // after 2 seconsd we set it to false to return to the page
        setTimeout(()=>dispatch(cityAction.clearIsCityCreated()),2000)//2 second
      
        }catch(error){
            console.log(error.response)
           dispatch(cityAction.clearLoading())
        toast.error(error.response.data.message)
      
        }

    }
}




//update city picture 
export function updateCityPicture(newImage,EndroitId, imageId){
    return async(dispatch , getState)=>{
        try{
      
    await request.put(`api/cities/admin/update-image/${EndroitId}/${imageId}` , newImage,{
            headers:{
                Authorization: "Bearer " + getState().auth.admin.data.token,
                "Content-Type":"multipart/form-data"
            } 
        });
        dispatch(fetchCities())
       toast.success("new city image uploaded successfully")
        }catch(error){
         toast.error(error.response.data.message)
         console.log(error.response)
        }

    }
}


//update city
export function updateCity(newCity,CityId){
    return async(dispatch , getState)=>{
        try{
      
  const {data}=  await request.put(`api/cities/admin/${CityId}` , newCity,{
            headers:{
                Authorization: "Bearer " + getState().auth.admin.data.token,
              
            } 
        });
        dispatch(cityAction.setCity(data))
        dispatch(fetchCities())
        toast.success("city updated successfully")
        }catch(error){
        toast.error(error.response.data.message)
        
        }

    }
}


//delete city
export function deleteCity(CityId){
    return async(dispatch , getState)=>{
        try{
      
  const {data}=  await request.delete(`api/cities/admin/${CityId}`,{
            headers:{
                Authorization: "Bearer " + getState().auth.admin.data.token,
              
            } 
        });
        dispatch(cityAction.deleteCity(data.cityId))
        dispatch(fetchCities())
        toast.success("city deleted successfully")
        }catch(error){
        toast.error(error.response.data.message)
        
        }

    }
}


//delete image 
export function deleteImage(cityId , imageId){
    return async(dispatch , getState)=>{
        try{
      
  const {data}=  await request.delete(`api/cities/admin/update-image/${cityId}/${imageId}`,{
            headers:{
                Authorization: "Bearer " + getState().auth.admin.data.token,
              
            } 
        });
        dispatch(cityAction.deleteCity(data.cityId))
        dispatch(fetchCities())
        toast.success("image deleted successfully")
        }catch(error){
            
            toast.error(error.response.data.message)
        
        }

    }
}







