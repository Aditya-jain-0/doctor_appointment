import React, { useState, useEffect } from 'react';
import Timing from '../Component/Timing';

const PORT = process.env.REACT_APP_SERVER_PORT;
const API_BASE = `http://localhost:${PORT}`;

const Home = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [email, setEmail] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const resp = await fetch(API_BASE);
        if (resp.status === 200) {
          const data = await resp.json();
          const filteredDoctors = data.filter(doctor => doctor.slots.some(slot => !slot.isBooked));
          setDoctors(filteredDoctors);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    }
    fetchdata();
  }, []);

  const handleclick = (name, timings) => {
    setSelectedItem({ name, timings });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const resp = await fetch(API_BASE, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        useremail: email
      })
    })
    if (resp.status === 200) {
      const data = await resp.json();
      setName(data.name);
      setIsLogin(true);
    }
  }

  return (
    <>
      <div className='user'>
        {!isLogin ? (
          <>
            Enter Your Email :&nbsp;
            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <button onClick={handlesubmit}>Login</button>
          </>
        ) : (
          <>
            <p>Hi, {name}</p>
          </>
        )}
        <br />
        <a href='/register'>Register</a>
      </div>
      <br />
      <div className='main'>
        <div className='doctorslist'>
          <ol>
            {doctors.map((doctor, index) => (
              <li
                onClick={() => handleclick(doctor.docname, doctor.slots.map(slot => slot.timing))}
                key={index}
                className={selectedItem?.name === doctor.docname ? 'selected' : ''}
              >
                {doctor.docname}
              </li>
            ))}
          </ol>
        </div>
        <div className='timings'>
          {selectedItem && (
            <div>Book Appointments for {selectedItem.name}<br />
              <div className='timing-container'>
                {selectedItem.timings.map((timing, index) => (
                  <div key={index} className='timing-item'>
                    <Timing element={timing} islogin={isLogin} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
