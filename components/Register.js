import React,{useState} from 'react'
import {createUserWithEmailAndPassword} from "firebase/auth";
import { auth } from '../firebase';
import { setDoc,doc,Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
export default function Register() {
    const [data, setData] = useState({
        name:"",
        email:"",
        password:"",
        error:null,
        loading:false,
    })
    const navigate=useNavigate();
    const {name,email,password,error,loading}=data;
    const handleChange = (e) =>{
        setData({...data,[e.target.name]:e.target.value});
    };

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setData({...data,error:null,loading:true})
        // console.log(data)
        if(!name && !email && password){
            setData({...data,error:"All fields are required"})
        }
        try{
            const result=await createUserWithEmailAndPassword(auth,email,password);
            // console.log(result.user);
            await setDoc(doc(db,'users',result.user.uid),{
              uid:result.user.uid,
              name,
              email,
              createdAT:Timestamp.fromDate(new Date()),
              isOnline:true,
            })
            setData({
              name:"",email:"",password:"",error:null,loading:false,
            });
            navigate("/chats")
        }
        catch(err){
          setData({...data,error:err.message,loading:false})
        }
    }
  return (
    <section>
    <div className="text-center">
        <h1>Create an Account</h1>
        <form onSubmit={handleSubmit}>
    <div className="mb-3">
    <label htmlFor="input" className="form-label">Name</label>
    <input type="text" name='name' className="form-control" id="input" value={name} onChange={handleChange} style={{width:"60vw",margin: "auto"}}/>
  </div>  

  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" name='email' className="form-control" id="exampleInputEmail1" value={email} onChange={handleChange} style={{width:"60vw",margin: "auto"}} aria-describedby="emailHelp"/>
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" name="password" className="form-control" id="exampleInputPassword1" value={password} onChange={handleChange} style={{width:"60vw",margin: "auto"}}/>
  </div>
{error ? <p className='text-center' style={{color:"red"}}>{error}</p>:null}
  <button type="submit" disabled={loading}  className="btn btn-primary">{loading ? "Creating ..." : "Register"}</button>
</form>
</div>
    </section>
  )
}
