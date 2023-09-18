import React from 'react'

const Timing = ({element}) => {
  const handleclick = (timing)=>{
    alert(`confirm booking for ${timing}`)
  }
  return (
    <>
    <h1 onClick={()=>{handleclick(element)}}>{element}</h1>
    </>
  )
}

export default Timing