import React,{useState} from 'react'
import {useForm} from 'react-hook-form'
import { onAuthStateChanged } from 'firebase/auth'
import {addDoc, collection} from 'firebase/firestore'
import { db } from '../../fire-base'
import { auth } from '../../fire-base'
import { useNavigate } from 'react-router-dom'
function Form() {
    const navigate = useNavigate()
    const [user, setUser] = useState()
    onAuthStateChanged(auth, currentUser => {
        setUser(currentUser)
    })
    const [title , setTitle] = useState('')
    const [description , setDescription] = useState('')
    const postRef = collection(db ,'posts')
    const onCreatePost = async (e) => {
    e.preventDefault()
     await addDoc(postRef , {
        title,
        description,
        username : user?.displayName || "",
        userId :  user?.uid || ""
     })
     navigate('/')
    }
  return (
    <form onSubmit={(e) => onCreatePost(e)}>
        <input type="" value={title} onChange={e => setTitle(e.target.value)} placeholder='Title ....'  />
        <p style={{color:'red'}}>{title=='' && <>You must add a title</>}</p>
        <textarea type="" value={description} onChange={e => setDescription(e.target.value)} placeholder='Descripton ...' />
        <p style={{color:'red'}}>{description=='' && <>You must add a description</>}</p>
        <input type="submit" />
    </form>
  )
}

export default Form