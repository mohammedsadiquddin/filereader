import React,{useState,useEffect} from 'react'
import { Avatar } from '@mui/material'
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";
export default function User({user1,chat,user,selectUser}) {
  const [seed,setSeed]=useState("");
  const user2 = user?.uid;
  const [data, setData] = useState("");
  useEffect(() => {
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    let unsub = onSnapshot(doc(db, "lastMsg", id), (doc) => {
      setData(doc.data());
    });
    return () => unsub();
  }, []);
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [])
  return (
    <>
    <div className={`user_wrapper ${chat.name === user.name && "selected_user"}`} onClick={()=> selectUser(user)}>
        <div className="user_info">
            <div className="user_detail">
                <Avatar src={`https://avatars.dicebear.com/api/male/:${seed}.svg`}/>
                <h4>{user.name}</h4>
                {data?.from !== user1 && data?.unread && (
              <small className="unread">New</small>
            )}
            </div>
            <div className={`user_status ${user.isOnline?"online":"offline"} `}></div>
        </div>
        {data && (
          <p className="truncate">
            <strong>{data.from === user1 ? "Me:" : null}</strong>
            {data.text}
          </p>
        )}
    </div>
     <div
     onClick={() => selectUser(user)}
     className={`sm_container ${chat.name === user.name && "selected_user"}`}
   >
     </div>
     </>
  );
};
