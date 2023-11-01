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
  const loc = useLocation()
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

  const handleclick = (docname, profession, slots) => {
    const state = { docname, profession, slots, isLogin,email,name};
    nav(`/doctor/${docname}`, { state });
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
      <div className="user">
        {!isLogin ? (
          <>
            Enter Your Email :&nbsp;
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handlesubmit}>Login</button>
          </>
        ) : (
          <>
            <p>Hi, {name}</p>
            {prev && (
              <>
                Previous Visit - Had Appointment with {prev.doctor} on {prev.date} at {prev.time} 
                <br/><button onClick={visitclick}>All Visits</button>
              </>
            )}
          </>          
        )}
        <br/>
        <a href="/register">Register</a>
      </div>
      
      <div className="main">
        <div className="doctorslist">
          <ol>
            {doctors.map((doctor, index) => (
              <li
                onClick={() =>
                  handleclick(doctor.docname, doctor.profession, doctor.slots)
                }
                key={index}
              >
                {doctor.docname} - {doctor.profession}<br/><br/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
};

export default Home;