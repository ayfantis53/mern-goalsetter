// npm installs
import { useDispatch } from 'react-redux';

// project imports
import { deleteGoal } from '../actions/goals/goalSlice';


/** ----------------------------------------------------------------------------------------
 * 
 * @param {*} param0 goal is passed into page to be displayed in html based on its information.
 * @returns How Goal item gets displayed in dashboard
 * ----------------------------------------------------------------------------------------*/
export default function GoalItem({ goal }) {

  // react hooks.
  const dispatch = useDispatch();

  // html page.
  return (
    <div className="goal">
        {/* DATE CREATED */}
        <div> { new Date(goal.createdAt).toLocaleString('en-US') } </div>
        {/* GOAL DESCRIPTION */}
        <h2> { goal.text } </h2>
        {/* DELETE GOAL BUTTON */}
        <button className="close" onClick={()=>dispatch(deleteGoal(goal._id)) }> X </button>
    </div>
  );
};