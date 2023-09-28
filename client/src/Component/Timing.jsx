import React from 'react'

const Timing = ({element,islogin}) => {
  const handleclick = (timing)=>{
    if(islogin){
    alert(`confirm booking for ${timing}`)
    }else{
    alert("You need to login first to continue booking")
    }
  }
  return (
    <>
    <p onClick={()=>{handleclick(element)}}>{element}</p>
    </>
  )
}

export default Timing