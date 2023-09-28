import React,{useState,useRef} from 'react'
const PORT = process.env.REACT_APP_SERVER_PORT;
const API_BASE = `http://localhost:${PORT}/register`
const Register = () => {
  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [otp, setotp] = useState("")
  const servertopref = useRef(0);

  const handleverf = async(e)=>{
    e.preventDefault();
    const resp = await fetch(API_BASE,{
    method:'POST',
    headers : {
       'Content-type':'application/json'
    },
    body:JSON.stringify({
      username:username,
      email:email,
    })
  })

  if(resp.status === 200){
    const data  = await resp.json();
    servertopref.current = data.otp;
  }
}
 
const handlesubmit = async(e) => {
  e.preventDefault();
  if (otp === servertopref.current.toString()) {
    console.log("Valid email user is good to go");
    const resp = await fetch(API_BASE,{
      method:'POST',
      headers : {
        'Content-type':'application/json'
     },
     body:JSON.stringify({
        username:username,
        email:email,
        flag : true
     })
    })

    if(resp.status === 200){
      const data = await resp.json();
      console.log(data);
    }

  } else {
    console.log("Invalid OTP");
  }
};


  return (
    <>
      <h1>Registration</h1>
      <form onSubmit={handleverf}>
          Enter Your Name :- <input
            type='text'
            value={username}
            onChange={(e)=>setusername(e.target.value)}
          />  
          <br/>
          Enter Email :- <input
            type='email'
            value={email}
            onChange={(e)=>setemail(e.target.value)}
          />
          <br/>
          <button>Verfy Email</button>
      </form>
          Enter Otp :- <input
            type='text'
            value={otp}
            onChange={(e)=>setotp(e.target.value)}
          /><br/>
        <button onClick={handlesubmit}>Register</button> 
      <p>Back to <a href='/'>Home</a></p>  
    </>
  )
}

export default Register