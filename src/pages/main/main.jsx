import { getDocs , collection, doc} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../fire-base'
import Post from './Post'

function Main() {
 
  const [postsList , setPostList] = useState([])
  const postref = collection(db , 'posts')
  const getPosts = async () => {
    const response = await getDocs(postref)
    setPostList(response.docs.map((doc) => (
     {...doc.data() , id:doc.id}
    )))
  };
  useEffect(() => {getPosts()} ,[])
  
  return (
    <>
    
    <div>
      {postsList?.map((post) => {
      return (
        <>
          <Post post={post}/>
          
        </>
      )
    })}</div>
    </>
  )
} 

export default Main