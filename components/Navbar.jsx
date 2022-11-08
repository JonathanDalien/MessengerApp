import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import { auth, db } from '../src/firebase'
import { signOut } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { AuthContext } from '../src/context/auth'

const Navbar = () => {

  const { user } = useContext(AuthContext);

  const handleSignout = async () => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      isOnline: false
    });
    await signOut(auth)
  }

  return (
    <nav>
      <h3><Link to="/">Messenger</Link></h3>
      <div>
        {user ?
          <>
            <Link to="/logout">Profile</Link>
            <button onClick={handleSignout} className='btn'>Logout</button>

          </> :
          <><Link to="/register">Register</Link>
            <Link to="/login">Login</Link></>
        }

      </div>
    </nav>
  )
}

export default Navbar