import React,{useRef,useEffect} from 'react'
import Moment from 'react-moment';
import "../App.css"
export default function Message({ msg,user1}) {
    const scrollRef = useRef();

    useEffect(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [msg]);
    let date=new Date();
  return (
   <div className={`message_wrapper ${msg.from === user1 ? "own" : ""}`}>
    <p className={msg.from === user1 ? "me" : "friend"}>
        {msg.text}
        <br />
    </p>
    <small>
    <Moment fromNow={msg.createdAt.toDate()}></Moment>
    </small>
   </div>
  )
}
