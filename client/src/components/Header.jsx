// npm installs
import { useSelector, useDispatch }          from 'react-redux';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate }                 from 'react-router';

// project imports
import { logout, reset } from '../actions/auth/authSlice';


/** ----------------------------------------------------------------------------------------
 * 
 * @returns Header with ability to log in out and register as a user to use site
 * ----------------------------------------------------------------------------------------*/
export default function Header() {

    // react hooks.
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    // Logout handler function for Logout button.
    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    }

    // html page.
    return (
        <header className="header">
            <div className="logo">
                <Link to='/'> GoalSetter </Link>
            </div>
            {/* UNORDERED LIST */}
            <ul>
                {user ? 
                    /* LOGOUT BUTTON LINK */
                    (<li>
                        <button className='btn' onClick={onLogout}> 
                            <FaSignOutAlt/> Logout
                        </button>
                    </li>)
                 : 
                    (<> {/* LOGIN BUTTON LINK */}
                        <li>
                            <Link to='/login'> 
                                <FaSignInAlt/> Login
                            </Link>
                        </li>
                        {/* REGISTER BUTTON LINK */}
                        <li>
                            <Link to='/register'> Register
                                <FaUser/>
                            </Link>
                        </li>
                    </>)
                }
            </ul>
        </header>
  );
};