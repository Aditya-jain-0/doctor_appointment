import React,{useState} from 'react'
const Register = () => {
  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  return (
    <>
      <h1>Registration</h1>
      <form>
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
          Enter Password :- <input
            type='password'
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
          />
          <br/>
          <button>Register Me</button>
      </form>  
      <p>Back to <a href='/'>Home</a></p>  
    </>
  )
}

export default Register