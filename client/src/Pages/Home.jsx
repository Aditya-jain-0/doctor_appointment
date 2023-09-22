import React, { useState } from 'react';
import Timing from '../Component/Timing';
const PORT = process.env.REACT_APP_SERVER_PORT;
const API_BASE = `http://localhost:${PORT}`

const Home = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [email, setemail] = useState("")
  const [islogin, setislogin] = useState(false)
  const [name, setname] = useState("")
  const doclist = [
    {
      name: 'A',
      timings: ['1', '2', '3', '4'],
    },
    {
      name: 'B',
      timings: ['5', '6', '7', '8'],
    },
    {
      name: 'C',
      timings: ['9', '10', '11', '12'],
    },
    {
      name: 'D',
      timings: ['13', '14', '15', '16'],
    },
    {
      name: 'E',
      timings: ['17', '18', '19', '20'],
    },
  ];


  const handleclick = (name, timings) => {
    setSelectedItem({ name, timings });
  };

  const handlesubmit = async(e)=>{
      e.preventDefault();
      const resp = await fetch(API_BASE,{
      method:'POST',
      headers : {
         'Content-type':'application/json'
      },
      body:JSON.stringify({
        useremail:email
      })
    })
    if(resp.status === 200){
        const data = await resp.json();
        // console.log(data);
        setname(data.name)
        setislogin(true);
    }

  }

  return (
    <>
      <div className='user'>
        {
          !islogin ? (
            <>
              Enter Your Email :&nbsp; 
              <input type='email' value={email} onChange={(e)=>setemail(e.target.value)}/>
              <button onClick={handlesubmit}>Login</button>
            </>              
          ):(
            <>
              <p>Hi,{name}</p>
            </>
          )
        }
        <br/>
        <a href='/register'>Register</a>
      </div>
      <br />
      <div className='main'>
        <div className='doctorslist'>
          <ol>
            {doclist.map((item, key) => (
              <li
                onClick={() => handleclick(item.name, item.timings)}
                key={key}
                className={selectedItem?.name === item.name ? 'selected' : ''}
              >
                {item.name}
              </li>
            ))}
          </ol>
        </div>
        <div className='timings'>
          {selectedItem && (
            <div>Book Appointments for {selectedItem.name}<br/>
            <div className='timing-container'>
              {selectedItem.timings.map((timing, index) => (
                <div key={index} className='timing-item'>
                  <Timing element={timing} />
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
