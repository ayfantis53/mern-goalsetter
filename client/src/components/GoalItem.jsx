// npm installs
import { useDispatch } from 'react-redux';

// project imports
import { deleteGoal } from '../actions/goals/goalSlice';


/** ----------------------------------------------------------------------------------------
 * 
 * @param {*} param0 goal is passed into page to be displayed in html based on its information.
 * @returns A Goal Item to be put into the Goal list for display
 * ----------------------------------------------------------------------------------------*/
export default function GoalItem({ goal }) {

  // react hooks.
  const dispatch = useDispatch();

  // html page.
  return (
    <div className="goal">
        {/* HOW OUR GOALS GET DISPLAYED IN OUR DASHBOARD */}
        <div> { new Date(goal.createdAt).toLocaleString('en-US') } </div>

        <h2> { goal.text } </h2>

        <button className="close" onClick={()=>dispatch(deleteGoal(goal._id)) }> X </button>
        {/* HOW OUR GOALS GET DISPLAYED IN OUR DASHBOARD */}
    </div>
  );
};