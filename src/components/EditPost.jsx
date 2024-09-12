import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AddPost from './AddPost'
import services from '../appWrite/config'

function EditPost() {

    const {id}=useParams()
    const [postToEdit,setPostToEdit]=useState('')

    useEffect(()=>{
    const getPostToEdit=async ()=>{
        await services.getPost(id)
        .then((response)=>{
            setPostToEdit(response)
            })
    }
    getPostToEdit()
},[])
    //console.log('postToEdit',postToEdit);
    
  return (
    <div><AddPost  postToEdit={postToEdit}/></div>

  )
}

export default EditPost