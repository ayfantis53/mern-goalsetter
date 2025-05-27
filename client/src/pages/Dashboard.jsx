// npm installs
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

// project imports
import Spinner from '../components/Spinner';
import { GoalForm, GoalItem} from '../components/__index.js';
import { getGoals, reset } from '../actions/goals/goalSlice';


/** ----------------------------------------------------------------------------------------
 * 
 * @returns Dashboard page with list of goals
 * ----------------------------------------------------------------------------------------*/
export default function Dashboard() {

  // react hooks.
  const navigate             = useNavigate();
  const dispatch             = useDispatch();
  const { user }             = useSelector((state) => state.auth);
  const { goals, isLoading } = useSelector((state) => state.goals);

  // If a user isnt actively logged in we send them back to login page.
  useEffect (() => {
    if (!user) {
      navigate('/login');
    }

    dispatch(getGoals());
    return () => { dispatch(reset()) }

  }, [user, navigate, dispatch]);

  // Spawn a loading animation page if we have not loaded all the way.
  if (isLoading) {
    return <Spinner />
  }

  // html page.
  return (
    <div data-testid='dashboard-display'>
      {/* TITLE */}
      <section className="heading">
          <h1> Welcome { user && user.name } </h1>
          <p> Goals Dashboards </p>
      </section>
      
      {/* GOAL FORM IMPORTED */}
      <GoalForm />

      {/* GOAL LIST */}
      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            { goals.map((goal) => (<GoalItem key={ goal._id } goal={ goal } />)) }
          </div>
        ) : (
          <h3> You have NOT set any Goals! </h3>
        )}
      </section>
    </div>
  );
};