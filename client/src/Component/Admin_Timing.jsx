import { React, useState } from 'react'

const Admin_Timing = ({ slot_id, slot,doctor_id }) => {

  const [isupdate, setisupdate] = useState(false)
  const [updatetime, setupdatetime] = useState("")

  const change_timing = ()=>{
    console.log(typeof(updatetime));
    
  }

  const delete_timing = () => {

  }

  return (


    <>
      <div className='admin-doc-timing'>
        <p>{slot.timing}</p>
        <button onClick={delete_timing}>Delete</button>
        <button onClick={() => setisupdate(!isupdate)}  >Update</button>
        {isupdate && (
          <>
            <input
              type='time' 
              value={updatetime}
              onChange={(e)=>setupdatetime(e.target.value)}
              />
            <button
              style={{ backgroundColor: 'greenyellow' }}
              onClick={change_timing}
            >
              Change</button>
          </>
        )}
      </div>
    </>
  )
}

export default Admin_Timing