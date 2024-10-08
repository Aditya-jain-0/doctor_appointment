import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast'
import { useNavigate,useLocation } from 'react-router-dom';

const PORT = process.env.REACT_APP_SERVER_PORT;
const API_BASE = `http://localhost:${PORT}`;

const Home = () => {
  const [doctors, setDoctors] = useState([]);
  const [email, setEmail] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState("");
  const [prev, setprev] = useState(null)
  const nav = useNavigate();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const resp = await fetch(API_BASE);
        if (resp.status === 200) {
          const data = await resp.json();
          setDoctors(data);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchdata();
  }, []);

  const handleclick = (docname,isavail , profession,contact,room, slots) => {
    if(isavail){
    const state = { docname, profession, contact, room, slots, isLogin, email, name};
    nav(`/doctor/${docname}`, { state });
    }else{
      toast.error(`${docname} is not Available today`)
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const resp = await fetch(API_BASE, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        useremail: email,
      }),
    });
    if (resp.status === 200) {
      const data = await resp.json();
      console.log(data);
      setName(data.name);
      setprev(data.latestVisit);
      toast.success(`${data.name} Logged in Successfully`)
      setIsLogin(true);
    }else if(resp.status === 401){
      toast.error(`Email not Authorized`)
    }
  };

  const visitclick = ()=>{
      const state = {name,isLogin}
      nav(`/visits/${name}`,{state})
  }

  return (
    <>
      <h1>Doctor Appointment System</h1>
      <div className="user">
        {!isLogin ? (
          <>
            <span style={{fontWeight:'bold',fontSize:'21px'}}>Enter Your Email :&nbsp;</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{fontWeight:'bold',fontSize:'15px'}}
            /><br/>
            <button className='defbtn' onClick={handlesubmit}>Login</button>
          </>
        ) : (
          <>
            <p style={{fontWeight:'bold',fontSize:'21px'}}>Hi, <span style={{fontWeight:'bold',fontSize:'21px',color:'greenyellow'}}>{name}</span></p>
            {prev && (
              <>
              <p>Previous Visit - Had Appointment with {prev.doctor} on {prev.date} at {prev.time} </p>
                <br/><button onClick={visitclick}>All Visits</button>
              </>
            )}
          </>          
        )}
        <br/>
        <a href="/register">Register</a>
        <br/>
        <a href="/admin">Admin Login</a>
      </div>
      
      <div className="main">
        <div className="doctorslist">
          <ol>
            {doctors.map((doctor, index) => (
              <li
                onClick={() =>
                  handleclick(doctor.docname,doctor.isavail, doctor.profession,doctor.contact,doctor.room ,doctor.slots)
                }
                key={index} style={{fontWeight:'bold',fontSize:'21px',cursor:'pointer'}}
              >
                {doctor.docname} - <u>{doctor.profession}</u>{doctor.isavail ? null : <span style={{marginLeft : 20,color:'red' }}><i>Not Available</i></span>}<br/><br/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
};

export default Home;