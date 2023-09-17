import React,{useState} from 'react'

const Login = () => {
  const [email, setemail] = useState("")
  return (
    <>
    <h1>Login</h1>
    <form>
     Enter Your registered Email :- <input
        type='email'
        value={email}
        onChange={(e)=>setemail(e.target.value)}
      />
      <br/>
      <button>Login</button>
    </form>
    <p>New here , go for <a href='register'>Register</a></p>
    </> 
  )
}

export default Login