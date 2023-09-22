import React from 'react'

const Timing = ({element}) => {
  const handleclick = (timing)=>{
    alert(`confirm booking for ${timing}`)
  }
  return (
    <>
    <p onClick={()=>{handleclick(element)}}>{element}</p>
    </>
  )
}

export default Timing