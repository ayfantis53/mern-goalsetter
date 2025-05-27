// npm installs
import { Provider }      from 'react-redux';
import { BrowserRouter } from 'react-router';
import userEvent         from '@testing-library/user-event';
import { act, render, screen, fireEvent } from '@testing-library/react';

// project imports
import { store    } from '../../app/store.js';
import { Register } from '../../pages/__index.js';


/** ----------------------------------------------------------------------------------------
 *  Validate Register Component rendering
 * ---------------------------------------------------------------------------------------- */ 
describe('|--------------------- register-form.test.js render ---------------------|', () => {

    // -- Hook to render page before each test.
    beforeEach(async () => {
        // render page.
        render(<Provider store={store}>
                <BrowserRouter>
                    <Register />
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
    test('renders Register page', () => {
        expect(screen.getByText("Please create an Account")).toBeInTheDocument();
    });

    // -- Validate inputs are empty.
    test('Inputs Initially empty', () => { 
        // Find input fields.
        const nameInputElement       = screen.getByPlaceholderText("Enter your name");
        const emailInputElement      = screen.getByPlaceholderText("Enter your email");
        const pwdInputElement        = screen.getByPlaceholderText("Enter your password");
        const confirmPwdInputElement = screen.getByPlaceholderText("Confirm password");

        // Verify inputs are empty or properly initialized.
        expect(nameInputElement.value).toBe('');
        expect(emailInputElement.value).toBe('');
        expect(pwdInputElement.value).toBe('');
        expect(confirmPwdInputElement.value).toBe('');
    });

    // -- Validate input "name" populates correctly.
    test('Input populate correctly "email"', () => {
        // Find input fields.
        const nameInputElement       = screen.getByPlaceholderText("Enter your name");
        // Enter in a text.
        userEvent.type(nameInputElement, "testy-tester");
        // Verify that text showed up in input textbox.
        expect(nameInputElement.value).toBe("testy-tester");
    });

    // -- Validate input "email" populates correctly.
    test('Input populate correctly "email"', () => {
        // Find input fields.
        const emailInputElement      = screen.getByPlaceholderText("Enter your email");
        // Enter in a text.
        userEvent.type(emailInputElement, "test@testing.com");
        // Verify that text showed up in input textbox.
        expect(emailInputElement.value).toBe("test@testing.com");
    });

    // -- Validate input "password" populates correctly.
    test('Input populate correctly "password"', () => {
        // Find input fields.
        const pwdInputElement        = screen.getByPlaceholderText("Enter your password");
        // Enter in a text.
        userEvent.type(pwdInputElement, "password");
        // Verify that text showed up in input textbox.
        expect(pwdInputElement.value).toBe("password");
    });

    // -- Validate input "password2" populates correctly.
    test('Input populate correctly "password2"', () => {
        // Find input fields.
        const confirmPwdInputElement = screen.getByPlaceholderText("Confirm password");
        // Enter in a text.
        userEvent.type(confirmPwdInputElement, "password");
        // Verify that text showed up in input textbox.
        expect(confirmPwdInputElement.value).toBe("password");
    });

    // -- Add Goal button is responsive.
    test('Validate "Add Goal" button is being called when pressed', () => {
        // Mock onSubmit button.
        const handleOnSubmitMock = jest.fn();
        screen.getByTestId('register-form').onsubmit = handleOnSubmitMock;

        // Select button.
        fireEvent.click(screen.getByRole("button", { name: "Register" }));

        // Verify that button calls onsubmit.
        expect(handleOnSubmitMock).toHaveBeenCalled();
    });
  
});