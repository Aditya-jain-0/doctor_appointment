import { useLocation } from 'react-router-dom';
import Timing from '../Component/Timing';
const Docpage = () => {
  const location = useLocation();
  const { docname, profession, slots, isLogin,email,name} = location.state; 

  return (
    <>
    <div>
    <h2>{docname}<br/></h2>
      <h2>{profession}<br/></h2>
      <div>
        <h2>Book Appointments for {docname}</h2>
        <br />
        <div className="timing-container">
          {slots.map((slot, index) => (
            !slot.isBooked && (
              <div key={index} className="timing-item">
                <Timing element={slot.timing} timingId={slot._id} islogin={isLogin} email = {email} username={name} docname={docname}/>
                {console.log(slot.timing," = ",slot._id)}                    
              </div>
            )
          ))}
        </div>
      </div>
    </div>
    <p>Back to <a href='/'>Home</a></p>  
    </>
  );
};

export default Docpage;