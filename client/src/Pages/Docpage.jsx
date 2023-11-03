import { useLocation } from 'react-router-dom';
import Timing from '../Component/Timing';
import logo from '../images/doc_icon_1.png'
const Docpage = () => {
  const location = useLocation();
  const { docname, profession, contact, room, slots, isLogin,email,name} = location.state; 

  return (
    <>
    <div>
    <img src={logo} alt='Doctor logo' height={'100px'} width={'100px'} />
    <h2>{docname}, <span style={{color:'greenyellow'}}>{profession}</span><br/></h2>
    <h3>Contact:- <u>{contact}</u></h3>
    <h3>Location:- <u>{room}</u></h3>
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