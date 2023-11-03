import React from 'react'
import { toast } from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

const PORT = process.env.REACT_APP_SERVER_PORT;
const API_BASE = `http://localhost:${PORT}`;

const currdate = ()=>{
  const date = new Date(); 
  const mnths = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']; 
  return `${date.getDate()} ${mnths[date.getMonth()]} ${date.getFullYear()}`;
}
const Timing = ({element,timingId,islogin,email,username,docname}) => {
  const nav = useNavigate();
  const handleclick = async(timing)=>{
    if(islogin){
      if(window.confirm(`Confirm Appointment with ${docname} at ${element}`)){
        try { 
       const resp = await fetch(`${API_BASE}/book/${timingId}`,{
        method:'POST',
        headers : {
          'Content-type':'application/json'
       },
       body:JSON.stringify({
          username : username,
          email : email,
          docname : docname,
          timing : element,
          timingId:timingId,
       })
       })
       if(resp.status === 200){
        const data = await resp.json();
        toast.success('Booking Done , Confirmation is sent to email')
        nav('/');
        const response = await fetch(`${API_BASE}/addprevisit`,{
          method:'POST',
          headers:{
            'Content-type':'application/json'
          },
          body:JSON.stringify({
              username:username,
              docname:docname,
              timing:timing,
              currdate : currdate(),
          })
        })
        if(response.status === 200){
          const value = await response.json();
          console.log(value);
        }
       }

      }catch (error) {
        toast.error('Internal Server Error')
       console.log(error);
      }
    }
      // alert("Hello")
    }else{
      alert("You Need to Log in first in order to Book Appointment")
    }
  }
  return (
    <>
    <p onClick={()=>{handleclick(element)}}>{element}</p>
    </>
  )
}

export default Timing 