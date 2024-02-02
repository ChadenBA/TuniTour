import request  from '../../utils/request'
import { toast } from "react-toastify"
import { categoryAction } from '../slices/categorySlice';


// fetch all category 
export function fetchCategories(){
    return async(dispatch)=>{
        try{

        const {data}=await request.get(`api/categories/`);
        dispatch(categoryAction.setCategories(data))
        }catch(error){
           toast.error(error.response.data.message)
      
        }

    }
}



//create category 
export function createCategory(newCategory){
    return async(dispatch , getState)=>{
        try{
        dispatch(categoryAction.setLoading())
        await request.post(`api/categories/admin` , newCategory,{
            headers:{
                Authorization: "Bearer " + getState().auth.admin.data.token,
            } 
        });
        dispatch(categoryAction.setIsCategoryCreated())//put it ro true
        dispatch(fetchCategories())
        toast.success("category created successfully")
        // after 2 seconsd we set it to false to return to the page
        setTimeout(()=>dispatch(categoryAction.clearIsCategoryCreated()),2000)//2 second
        }catch(error){
          
          dispatch(categoryAction.clearLoading())
          toast.error(error.response.data.message)
      
        }

    }
}





//update Category
export function updateCategory(newCategory,CategoryId){
    return async(dispatch , getState)=>{
        try{
      
  const {data}=  await request.put(`api/categories/admin/${CategoryId}` , newCategory,{
            headers:{
                Authorization: "Bearer " + getState().auth.admin.data.token,
              
            } 
        });
        dispatch(categoryAction.setCategory(data))
        dispatch(fetchCategories())
        toast.success("category updated successfully")
        }catch(error){
            
         toast.error(error.response.data.message)
        
        }

    }
}


//delete category 
export function deleteCategory(CategoryId){
    return async(dispatch , getState)=>{
        try{
      
  const {data}=  await request.delete(`api/categories/admin/${CategoryId}`,{
            headers:{
                Authorization: "Bearer " + getState().auth.admin.data.token,
              
            } 
        });
        dispatch(fetchCategories())
        dispatch(categoryAction.deleteCategory(data.CategoryId));
        toast.success("category deleted successfully")
        }catch(error){
            console.log(error)
         toast.error(error.response.data.message)
        
        }

    }
}

