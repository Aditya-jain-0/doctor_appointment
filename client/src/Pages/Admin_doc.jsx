import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'


const PORT = process.env.REACT_APP_SERVER_PORT;
const API_BASE = `http://localhost:${PORT}/admin`;


const Admin_doc = () => {
  const nav = useNavigate();
  const location = useLocation();
  const { doctorid, doctorname,doctorstatus } = location.state;
  const [docinfo, setDocinfo] = useState({})
  const [change, setchange] = useState(false)
  // console.log(doctorstatus);


  // Fetching Doctor Data
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const resp = await fetch(`${API_BASE}/${doctorname}/${doctorid}`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            doctorid,
            doctorname
          }),
        });

        if (resp.status === 200) {
          const serverdata = await resp.json();
          setDocinfo(serverdata.data);
        } else if (resp.status === 404) {
          alert("Doctor Not Found")
        } else {
          alert("Internal Server Error")
        }

      } catch (error) {
        console.log(error);
      }
    }
    fetchdata()
  }, [change])

  const returnback = () => {
    nav('/admin')
  }

  const changestatus = (doctorid) => {
    const fetchdata = async () => {
      const available = doctorstatus ? 1 : 0;
      try {
        const resp = await fetch(`${API_BASE}/${doctorname}/${doctorid}/changestatus`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            doctorid,
            available
          }),
        });

        if (resp.status === 200) {
          const servermsg= await resp.json();
          console.log(servermsg);
          setchange(!change)
        } else if (resp.status === 404) {
          alert("Doctor Not Found")
        } else {
          alert("Internal Server Error")
        }
      } catch (error) {
        console.log(error);
      }
    }
    if(window.confirm(`Make ${doctorname} ${doctorstatus ? "Unavailable" : "Available"}`)){
    fetchdata()
    }
  }

  return (
    <>
      <div className='main'>
        <h2> Doctor Name :-{docinfo.docname}<br /></h2>
        <h2>  Doctor Profession :-{docinfo.profession}<br /></h2>
        <h2>   Doctor Contact :-{docinfo.contact}<br /></h2>
        <h2> Doctor Availability :-
          {docinfo.isavail ?
            <>
              <button className='a'>
                Available
              </button>
              <button className='b' onClick={() => changestatus(docinfo._id)}>
                Not Available
              </button>
            </>
            :
            <>
              <button className='b' onClick={() => changestatus(docinfo._id)}>
                Available
              </button>
              <button className='a'>
                Not Available
              </button>
            </>
          }
        </h2>
      </div>
      <button className='defbtn' onClick={returnback}>Back</button>
    </>
  )
}

export default Admin_doc