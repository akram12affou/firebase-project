import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { auth, provider } from '../fire-base'
// import { useNavigate } from 'react-router-dom'

// import {useAuthState} from 'react-firebase-hooks/auth'
function Navbar() {
    // const navigate = useNavigate()
    const [user, setUser] = useState()
    onAuthStateChanged(auth, currentUser => {
        setUser(currentUser)
    })
    // const [user] = useAuthState(auth)
    const logout = async () => {
        await signOut(auth)
        window.location.pathname = '/'
    }
    
    return (
        <div>

            <Link to='/'>Home</Link>
            {!user && <Link to='/login'>Login</Link>}
             {user &&  <Link to='/createpost'>Create Post</Link>}
            {user &&
                (<><div>
                    <p>{auth.currentUser?.displayName}</p>
                    <img src={auth.currentUser?.photoURL || ""} alt="" height='20' weight='20' />
                </div>
                    <button onClick={logout}>Logout</button>
                </>)}
        </div>
    )
}

export default Navbar