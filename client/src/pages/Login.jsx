// npm installs
import { useState, useEffect      } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast                    } from 'react-toastify';
import { FaSignInAlt              } from 'react-icons/fa';
import { useNavigate              } from 'react-router';

// project imports
import { Spinner      } from '../components/__index.js';
import { login, reset } from '../actions/auth/authSlice';


/** ----------------------------------------------------------------------------------------
 * 
 * @returns Login page for users to login with credentials
 * ----------------------------------------------------------------------------------------*/
export default function Login() {

  // react hooks.
  const [formData, setFormData]                          = useState({ email:'', password:''});
  const { email, password }                              = formData;

  const navigate                                         = useNavigate();
  const dispatch                                         = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  // Login successful navigate to Dashboard page with goals list, if not show error.
  useEffect(() => {
    if (isError) { 
      toast.error(message); 
    }
    if (isSuccess || user) { 
      navigate('/'); 
    }

    dispatch(reset());

  }, [user, isError, isSuccess, message, navigate, dispatch]);

  // html helper functions.
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  // Send login data to backend to have token created.
  const onSubmit = (e) => {
    e.preventDefault();

    const userData = { email, password, };
    dispatch(login(userData));
  }

  // If page is not loaded animate with spinner.
  if (isLoading) {
    return <Spinner />
  }

  // html page.
  return (
    <div data-testid='login-display'>
    {/* HEADING OF THE PAGE */}
      <section className='heading'>
          <h1>
              <FaSignInAlt /> Login  
          </h1>
          <p> Please Enter your Credentials </p>
      </section>
    {/* LOGIN FORM */}
      <section className="form">
          <form onSubmit={onSubmit} data-testid='login-form'>
            {/* EMAIL INPUT */}
            <div className="form-group">
              <input type="email" className='form-control' id='email' name='email' value={email} placeholder='Enter your email' onChange={onChange} />
            </div>
            {/* PASSWORD INPUT */}
            <div className="form-group">
              <input type="password" className='form-control' id='password' name='password' value={password} placeholder='Enter your password' onChange={onChange} />
            </div>
            {/* SUBMIT INFO BUTTON */}
            <div className="form-group">
              <button type="submit" className='btn btn-block'> Login </button> 
            </div>
          </form>
      </section>
      {/* LOGIN FORM */}
    </div>
  );
};