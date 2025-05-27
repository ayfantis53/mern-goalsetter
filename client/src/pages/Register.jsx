// npm imports
import { useState, useEffect }      from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaUser }                   from 'react-icons/fa';
import { toast }                    from 'react-toastify';
import { useNavigate }              from 'react-router';

// project imports
import { Spinner } from '../components/__index.js';
import { register, reset } from '../actions/auth/authSlice';


/** ----------------------------------------------------------------------------------------
 * 
 * @returns Register page for users to create account with credentials
 * ----------------------------------------------------------------------------------------*/
export default function Register() {
  
  // react hooks.
  const navigate                             = useNavigate();
  const dispatch                             = useDispatch();

  const [formData, setFormData]              = useState({ name:'', email:'', password:'', password2:'' });
  const { name, email, password, password2 } = formData;
  
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  // Register successful navigate to Dashboard page with goals list, if not show error.
  useEffect(() => {
    if (isError) { 
      toast.error(message); 
    }
    if (isSuccess || user) { 
      navigate('/'); 
    }

    dispatch(reset());

  }, [user, isError, isSuccess, message, navigate, dispatch]);

  // Function to save state data from form as it is filled out by user.
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  };

  // Registers user if they enter in their credentials correct.
  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error('Passwords do not Match!');
    }
    else {
      const userData = { name, email, password, };
      dispatch(register(userData));
    }
  }

  // If page is not loaded animate with spinner.
  if (isLoading) {
    return <Spinner />
  }

  // html page.
  return (
    <div data-testid='register-display'>
    {/* HEADING OF THE PAGE */}
      <section className='heading'>
          <h1>
              <FaUser /> Register  
          </h1>
          <p> Please create an Account </p>
      </section>
    {/* REGISTER FORM */}
      <section className="form">
          <form onSubmit={onSubmit} data-testid='register-form'>
            {/* NAME INPUT */}
            <div className="form-group">
              <input type="text" className='form-control' id='name' name='name' value={name} placeholder='Enter your name' onChange={onChange} />
            </div>
            {/* EMAIL INPUT */}
            <div className="form-group">
              <input type="email" className='form-control' id='email' name='email' value={email} placeholder='Enter your email' onChange={onChange} />
            </div>
            {/* PASSWORD INPUT */}
            <div className="form-group">
              <input type="password" className='form-control' id='password' name='password' value={password} placeholder='Enter your password' onChange={onChange} />
            </div>
            {/* CONFIRM PASSWORD INPUT */}
            <div className="form-group">
              <input type="password" className='form-control' id='password2' name='password2' value={password2} placeholder='Confirm password' onChange={onChange} />
            </div>
            {/* SUBMIT INFO BUTTON */}
            <div className="form-group">
              <button type="submit" className='btn btn-block'> Register </button> 
            </div>
          </form>
      </section>
      {/* REGISTER FORM */}
    </div>
  );
};