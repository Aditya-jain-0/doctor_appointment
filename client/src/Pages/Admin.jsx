import React, { useState, useEffect, useRef } from 'react';

import { useNavigate } from 'react-router-dom'

const PORT = process.env.REACT_APP_SERVER_PORT;
const API_BASE = `http://localhost:${PORT}/admin`;

const Admin = () => {
  const usernameref = useRef(null);
  const passwordref = useRef(null);
  const [login, setlogin] = useState(false);
  const [data, setdata] = useState({ doctors: [] });
  const nav = useNavigate();


  useEffect(() => {
    if (login) {
      const fetchdata = async () => {
        try {
          const resp = await fetch(`${API_BASE}/getadmindata`);
          if (resp.status === 200) {
            const fetchedData = await resp.json();
            setdata(fetchedData);
          }
        } catch (error) {
          console.error("Error fetching", error);
        }
      };
      fetchdata();
    }
  }, [login]);

  const handleverf = async (e) => {
    e.preventDefault();
    const resp = await fetch(API_BASE, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        username: usernameref.current.value,
        password: passwordref.current.value,
      }),
    });
    if (resp.status === 200) {
      setlogin(true);
    }
  };

  const editdocpage = (doctor) => {
    // const state = doctor;
    const doctorname = doctor.docname;
    const doctorid = doctor._id;
    const doctorstatus = (doctor.isavail) ? 1 : 0;
    const state = { doctorid, doctorname,doctorstatus };
    nav(`/admin/${doctor.docname}/${doctor._id}`, { state })
  }

  return (
    <>
      {!login ? (
        <>
          <h2>Admin</h2>
          <form onSubmit={handleverf}>
            <span>User Name</span>
            <input type="text" ref={usernameref} />
            <br />
            <span>Enter Password</span>
            <input type="password" ref={passwordref} />
            <br />
            &nbsp;&nbsp;&nbsp;
            <button>Verify</button>
          </form>
        </>
      ) : (
        <>
          {data.doctors && (
            <div>
              <h3>Doctors</h3>
              <ul className='admindoctorlist'>
                {data.doctors.map((doctor) => (
                  <li key={doctor._id}>
                    {doctor.docname}
                    <button 
                      className='defbtn' 
                      onClick={() => editdocpage(doctor)}>
                        Update
                     </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}

        <button className='defbtn' onClick={()=>{nav(`/`)}}>
        Back
        </button>
    </>
  );
};

export default Admin;
