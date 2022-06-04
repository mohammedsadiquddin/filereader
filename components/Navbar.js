import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { auth,db } from '../firebase'
import { signOut } from 'firebase/auth'
import { updateDoc,doc } from 'firebase/firestore'
import { AuthContext } from '../contexts/auth'
import { useNavigate } from 'react-router-dom';
export default function Navbar() {
  const navigate = useNavigate();
  const  {user} = useContext(AuthContext);

  const handleSignout = async () => {
    await updateDoc(doc(db, "users",auth.currentUser.uid),{
      isOnline: false,
    });
    await signOut(auth);
    navigate("/login");
  };
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
   <div className="container-fluid">
    <Link className="navbar-brand" to="#">ACES CHAT APP</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        {user ? (
        <>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/profile">Profile</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/chats">Chats</Link>
        </li>
        <button className="btn btn-primary" type="submit" onClick={handleSignout}>Logout</button>
        </>
        ):( 
          <>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/register">Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
        </li>
        </>
        )}
      </ul>
    </div>
  </div>
</nav></>
  )
}
