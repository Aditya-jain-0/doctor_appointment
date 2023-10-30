import './App.css';
import Home from './Pages/Home';
import Register from './Pages/Register'
import {Toaster} from 'react-hot-toast'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Docpage from './Pages/Docpage';

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
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;