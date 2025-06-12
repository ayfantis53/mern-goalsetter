// npm installs
import { useState    } from 'react';
import { useDispatch } from 'react-redux';
import { toast       } from 'react-toastify';
import { useNavigate } from 'react-router';

// project imports
import { createGoal } from '../actions/goals/goalSlice';


/** ----------------------------------------------------------------------------------------
 * 
 * @returns Form to create a Goal
 * ----------------------------------------------------------------------------------------*/
export default function GoalForm() {

    // react hooks.
    const [text, setText] = useState('');
    const dispatch        = useDispatch();
    const navigate        = useNavigate();

    // html helper functions.
    const onSubmit = (e) => {
        e.preventDefault();
        // Goal Slice function.
        dispatch(createGoal({ text }));
        navigate('/');
        toast.success('Goal Added!');
    }

    // html page.
    return (
        <section className="form">
            {/* FORM TO SUBMIT A NEW GOAL */}
            <form onSubmit={onSubmit} data-testid='goal-form'>
                {/** GOAL INPUT */}
                <div className="form-group">
                    <label htmlFor="goal" className='form-label'> Goal </label>
                    <input type="text" id="goal" value={text} onChange={ (e)=>setText(e.target.value) } />
                </div>
                {/** SUBMIT BUTTON */}
                <div className="form-group">
                    <button className="btn btn-block" type='submit'> Add Goal </button>
                </div>
            </form>
            {/* FORM TO SUBMIT A NEW GOAL */}
        </section>
    );
};