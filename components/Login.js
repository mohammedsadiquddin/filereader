import React,{useState} from 'react'
import {signInWithEmailAndPassword} from "firebase/auth";
import { auth } from '../firebase';
import { doc,updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
export default function Login() {
    const [data, setData] = useState({
        email:"",
        password:"",
        error:null,
        loading:false,
    })
    const navigate=useNavigate();
    const {email,password,error,loading}=data;
    const handleChange = (e) =>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        setData({...data,error:null,loading:true})
        // console.log(data)
        if(!email && password){
            setData({...data,error:"All fields are required"})
        }
        try{
            const result=await signInWithEmailAndPassword(auth,email,password);
            // console.log(result.user);
            await updateDoc(doc(db,'users',result.user.uid),{
              isOnline:true,
            })
            setData({
             email:'',password:'',error:null,loading:false
            })
            navigate("/chats")
        }
        catch(err){
          setData({...data,error:err.message,loading:false})
        }
    }
  return (
    <section>
    <div className="text-center">
        <h1>Login to your Account</h1>
        <form onSubmit={handleSubmit}> 
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" name='email' className="form-control" id="exampleInputEmail1" value={email} onChange={handleChange} style={{width:"60vw",margin: "auto"}} aria-describedby="emailHelp"/>
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" name="password" className="form-control" id="exampleInputPassword1" value={password} onChange={handleChange} style={{width:"60vw",margin: "auto"}}/>
  </div>
{error ? <p className='text-center' style={{color:"red"}}>{error}</p>:null}
  <button type="submit" disabled={loading} className="btn btn-primary">Login</button>
</form>
{/* {loading?"logging in...":"login"} */}
</div>
    </section>
  )
}