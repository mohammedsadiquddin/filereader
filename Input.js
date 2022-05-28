import React, { useState } from 'react'
import { render } from '@testing-library/react'

export default function Input() {

const [state,setState]=useState('');

const handleChange = (e)=>{
 const file=e.target.files[0];
 const reader=new FileReader();
 reader.readAsText(file);
 reader.onload = () =>{
   setState({
    filecontent:reader.result
   })
 }
 reader.onerror = ()=>{
   console.log('file error')
 }
}

  return (
   <>
      <h1>upload file</h1>
      <input onChange={handleChange} type="file" name="file" id="file" />
      <p>{state.filecontent}</p>
      </>
  )
}
