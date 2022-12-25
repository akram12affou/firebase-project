import { onAuthStateChanged } from 'firebase/auth'
import { addDoc,doc, collection,deleteDoc,getDocs,query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../fire-base'

function Post({post}) {
  // bring the user infos -(uid from google)
  const [commenttext, setCommenttext] = useState('')
  const [user, setUser] = useState() 
  onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
  })
    // define the likes collection
    const likesRef = collection(db ,'likes')
    const commentsRef = collection(db ,'comments')
    // define the likes collection that relate to every single post
    const LikesDoc = query(likesRef , where("postId" , '==' , post.id))
    const commentsDoc = query(commentsRef , where("postId" , '==' , post.id))
    // set a varianle that containe the post id and the one who liked
    const [likes , setLikes] = useState([])
    const [comments , setComments] = useState([])
    // check if this user liked the post or not
    const userhasLiked = likes?.find((like) => like.userId === user?.uid)
    // get likes collection and sign it wit variante setlikes
    const getLikes = async () => {
      const data = await getDocs(LikesDoc)
      setLikes(data.docs.map((doc) => (
        { userId : doc.data().userId }
       )))
    }
    const getComments = async () => {
      const data = await getDocs(commentsDoc)
      setComments(data.docs.map((doc) => (
        { userId : doc.data().userId, comment : doc.data().comment}
       )))
    }
    
    // call the function that set the collection
    useEffect(() => {
      getLikes()
      getComments()
    } ,[])
    console.log(comments);
    // the function that handle the like
    const handleLike = async () => {
        if(!userhasLiked){
     await addDoc(likesRef , {
       userId : user?.uid,
       postId : post.id
     })
    
     getLikes()
    }else{
        const likeToDeleteQuery = query(
            likesRef,
            where('postId','==',post.id),
            where('userId','==',user?.uid)
        );
        const likeToDeleteData = await getDocs(likeToDeleteQuery)
        const likeToDelete = doc(db , 'likes',likeToDeleteData.docs[0].id)
        await deleteDoc(likeToDelete)
        getLikes()
    }
    } 
    const handleComments = async () => {
      await addDoc(commentsRef , {
        userId : user?.displayName,
        postId : post.id,
        comment : window.prompt()
      })
      getComments()
    }
    
  return (
    <div>
      
      {[post].map((e) => {
            return(
               <center>
               <h1>{e.title}</h1>
               <p>{e.description}</p>
               @{e.username}
               <button onClick={handleLike} disabled={!auth.currentUser}> {userhasLiked  ? <>&#128078;</>  :<>&#128077;</>} </button>
               <p>Likes : {likes.length}</p>
                <button onClick={handleComments} disabled={!auth.currentUser}>Add Comment</button>
                {comments.map((e) => {
                  return(
                    <>
                    <br />
                    <span>@{e.userId} say :</span>
                    <span>{e.comment}</span>
                    
                    </>
                  )
                })}
                <hr />
                 
               </center>  
            )
        })
        }
    </div>
  )
}

export default Post