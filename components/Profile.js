import React, {useState, useEffect } from 'react'
import "../App.css"
import {db, auth } from "../firebase";
import {getDoc,doc} from "firebase/firestore"
import { Avatar } from '@mui/material'
export default function Profile() {
  const [user, setUser] = useState();
  const [seed,setSeed]=useState();
  useEffect(() => {
    getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data());
      }
    });
  }, [])
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [])
  let date=new Date();
  return user ?(
    <>
    <div className="profile_container">
      <div className="img_container">
        <Avatar src={`https://avatars.dicebear.com/api/male/:${seed}.svg`}/>
      </div>
    <div className="text_container">
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <hr />
          {/* <small>Joined on: {user.createdAt.toDate().toDateString()}</small> */}
          <small>Joined on:{date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear()}</small>
        </div>
    </div>
    </>
  ):null
}
