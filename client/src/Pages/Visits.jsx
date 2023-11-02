import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const PORT = process.env.REACT_APP_SERVER_PORT;
const API_BASE = `http://localhost:${PORT}`;

const Visits = () => {
  const location = useLocation();
  const { name, isLogin } = location.state ? location.state : { name: null, isLogin: false };
  const [visits, setvisits] = useState([]);

  useEffect(() => {
    if (isLogin) {
      const fetchdata = async () => {
        try {
          const resp = await fetch(`${API_BASE}/visits/${name}`, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({
              username: name,
            }),
          });
          if (resp.status === 200) {
            const v = await resp.json();
            setvisits(v);
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchdata();
    }
  }, [isLogin, name]);

  return (
    <>
      {isLogin ? (
        <>
          <div style={{fontWeight:'bold',fontSize:'15px'}}>Visits by {name} </div>
          {visits.length > 0 ? (
            <ul>
              {visits.map((val, index) => (
                <li style={{fontWeight:'bold',fontSize:'15px'}}
                 key={index}>{val.doctor} on {val.date} at {val.time}</li>
                
              ))}
            </ul>
          ) : (
            <p>No previous visits found.</p>
          )}
          <p>Back to <a href='/'>Home</a></p>
        </>
      ) : (
        <p>Please log in to view your visits.</p>
      )}
    </>
  );
};

export default Visits;
