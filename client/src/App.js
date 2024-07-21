import './App.css';
import Home from './Pages/Home';
import Register from './Pages/Register'
import {Toaster} from 'react-hot-toast'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Docpage from './Pages/Docpage';
import Visits from './Pages/Visits';
import Admin from './Pages/Admin';
import Admin_doc from './Pages/Admin_doc';

function App() {
  return (
    <>
      <div>
        <Toaster
            position="top-center"
            toastOptions={{
                success: {
                    theme: {
                        primary: '#4aed88',
                    },
                },
            }}
        ></Toaster>
      </div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/doctor/:docname' element={<Docpage />}/>
        <Route path='/visits/:username' element={<Visits/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/admin/:docname/:docid' element={<Admin_doc/>}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;