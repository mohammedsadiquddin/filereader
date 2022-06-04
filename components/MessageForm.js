import React from 'react'

export default function MessageForm({handleSubmit,text,setText}) {
  return (
    <form className='message_form' onSubmit={handleSubmit}>
        <div>
            <input type="text" name="msg" id="msg" placeholder='Enter message' value={text} onChange={(e) => setText(e.target.value)}/>
        </div>
        <div>
            <button className="btn" style={{backgroundColor:"white",color:"black"}}>send</button>
        </div>
    </form>
  )
}
