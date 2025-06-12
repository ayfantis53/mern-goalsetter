// npm installs
import { Provider      } from 'react-redux';
import { BrowserRouter } from 'react-router';
import userEvent         from '@testing-library/user-event';
import { render, screen, fireEvent } from '@testing-library/react';

// project imports
import { store    } from '../../app/store.js';
import { GoalForm } from '../../components/__index.js';


/** ----------------------------------------------------------------------------------------
 *  Validate GoalForm Component rendering
 * ---------------------------------------------------------------------------------------- */ 
describe('|--------------------- goal-form.test.js render ---------------------|', () => {

    // -- Hook to render page before each test.
    beforeEach(async () => {
        // render page.
        render(<Provider store={store}>
                    <BrowserRouter>
                    <GoalForm />
                    </BrowserRouter>
                </Provider>);

        /** provide an empty implementation for window.alert. */
        // remember the jsdom alert.
        jsdomAlert = window.alert; 
        window.alert = () => {}; 
    });

    // -- Hook to reset page after each test.
    afterEach(() => {
        // restore the jsdom alert.
        window.alert = jsdomAlert;
    });

    // -- Validate page renders correctly.
    test('renders GoalForm page', () => {
        expect(screen.getByText("Goal")).toBeInTheDocument();
    });

    // -- Validate inputs are empty.
    test('Inputs Initially empty', () => { 
        // Find input fields.
        const goalInputElement = screen.getByLabelText("Goal");
        // Verify inputs are empty or properly initialized.
        expect(goalInputElement.value).toBe('');
    });

    // -- Validate input "Goal" populates correctly.
    test('Input populate correctly "Goal"', () => {
        // Find input fields.
        const goalInputElement = screen.getByLabelText("Goal");
        // Enter in a text.
        userEvent.type(goalInputElement, "NewGoal");
        // Verify that text showed up in input textbox.
        expect(goalInputElement.value).toBe("NewGoal");
    });

    // -- Add Goal button is responsive.
    test('Validate "Add Goal" button is being called when pressed', () => {
        // Mock onSubmit button.
        const handleOnSubmitMock = jest.fn();
        screen.getByTestId('goal-form').onsubmit = handleOnSubmitMock;

        // Select button.
        fireEvent.click(screen.getByRole("button", { name: "Add Goal" }));

        // Verify that button calls onsubmit.
        expect(handleOnSubmitMock).toHaveBeenCalled();
    });
  
});