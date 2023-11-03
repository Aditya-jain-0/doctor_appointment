import React, { useState, useEffect, useRef } from 'react';

const PORT = process.env.REACT_APP_SERVER_PORT;
const API_BASE = `http://localhost:${PORT}/admin`;

const Admin = () => {
  const usernameref = useRef(null);
  const passwordref = useRef(null);
  const [login, setlogin] = useState(false);
  const [data, setdata] = useState({ doctors: [], users: [] });

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
          {data.doctors && data.users && (
            <div>
              <h3>Doctors</h3>
              <ul>
                {data.doctors.map((doctor) => (
                  <li key={doctor._id}>{doctor.docname}</li>
                ))} 
              </ul>

              <h3>Patients</h3>
              <ul>
                {data.users.map((user) => (
                  <li key={user._id}>{user.username}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Admin;
