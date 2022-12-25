import React from 'react'
import {auth, provider} from '../fire-base'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
function Login() {
  const navigate = useNavigate();
  const signinWithGoogle = async () => {
    await signInWithPopup(auth , provider);
   navigate('/');
  }
  return (
    <div>
      <p>sign in with google to continue</p>
      <button onClick={signinWithGoogle}>sign in with Google</button>
    </div>
  )
}

export default Login