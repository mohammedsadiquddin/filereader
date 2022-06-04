import React,{useContext} from "react";
import './App.css';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import AuthProvider from "./contexts/auth";
import Login from "./components/Login";
import Chats from "./components/Chats";
import Profile from "./components/Profile";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App(){
  return(
    <div className="app">
      <AuthProvider>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home/>} >        
        </Route>
        <Route exact path="/register" element={<Register/>}></Route>
        <Route exact path="/chats" element={<Chats/>}></Route>
        <Route exact path="/login" element={<Login/>}></Route>
        <Route exact path="/profile" element={<Profile/>}></Route>
        {/* <Route element={<PrivateWrapper />}> */}
        {/* <Route path="/" element={<Home/>} /> */}
        {/* {user ? <Navigate to="<Home/>" />:<Navigate to="<Login/>" /> } */}
        {/* </Route> */}
      </Routes>
      </BrowserRouter>
      </AuthProvider>
    </div>
  )
  }
export default App;