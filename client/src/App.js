// npm installs
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from 'react-router';

// project imports
import { Header }                     from './components/__index.js';
import { Dashboard, Login, Register } from './pages/__index.js';


/** ----------------------------------------------------------------------------------------
* 
* @returns Main Component of web app
* ----------------------------------------------------------------------------------------*/
function App() {

  return (
    <>
      <Router>
          <div className="container">
            <Header />
              <Routes>
                  <Route path='/'         element={<Dashboard />}/>
                  <Route path='/login'    element={<Login />    }/>
                  <Route path='/register' element={<Register /> }/>
              </Routes>
          </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;