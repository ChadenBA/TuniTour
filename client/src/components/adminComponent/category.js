import React, { useState , useReducer} from "react"
import "../../Styles/Endroit.css"
import {ToastContainer} from "react-toastify"
import {useDispatch} from "react-redux"
import swal from "sweetalert"
import {updateCategory,deleteCategory} from "../../redux/apiCalls/categoryApiCall"


import FormControl from '@material-ui/core/FormControl';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import  TextField from '@material-ui/core/TextField';
import  Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

function  CategoryCard ({category}) {
  const [reducer , forceUpdate]=useReducer(x=>x+1,0)

  const dispatch=useDispatch();
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState("")
  
 // update category 
 const formSubmitHandler = (e) => {
  e.preventDefault();
  dispatch(updateCategory({title},category?._id),[reducer])
   setIsEditing(false);
   forceUpdate();
  };

  // // Delete Category Handler
  const deleteCategoryHandler = () => {
    swal({
       title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this category!",
      icon: "warning",
       buttons: true,
       dangerMode: true,
    }).then((willDelete) => {
     if (willDelete) {
       dispatch(deleteCategory(category?._id),[reducer])
       forceUpdate();
       
     } else {
        swal("Something went wrong!");
      }
    });
  };

  return (

    <Card sx={{ maxWidth: 345 }} className="category-card">
    <ToastContainer theme="colored"></ToastContainer>  
         {!isEditing && (
            <>
            <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {category?.title}
        </Typography>
        </CardContent>
        {!category.readOnly && (
              <>
               <CardActions>
        <Button size="small"
        onClick={() => {
                setIsEditing(true)
                setTitle(category?.title)
               }}
               startIcon={<EditIcon/> }>Edit</Button>
        <Button size="small"
        onClick={deleteCategoryHandler}
        startIcon={<DeleteIcon />}> Delete</Button>
      </CardActions>
     
      </>
              
        )}
           </>
         )}
      
      {isEditing && (
        <FormControl >
        <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
     autoFocus onChange={e => setTitle(e.target.value)} type="text" className="form-control form-control-sm" value={title} placeholder="title"
       />
       
       </Box>
      <Button 
        size="small"  type="submit"
         onClick={formSubmitHandler}> Save </Button>{" "}
      <Button size="small"
       onClick={() => setIsEditing(false)}  >  Cancel</Button>
      </FormControl>
      )}
    </Card> 
  )
}
export default CategoryCard;