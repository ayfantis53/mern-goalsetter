// npm installs
import { Provider }      from 'react-redux';
import { BrowserRouter } from 'react-router';
import userEvent         from '@testing-library/user-event';
import { act, render, screen, fireEvent } from '@testing-library/react';

// project imports
import { store    } from '../../app/store.js';
import { Login } from '../../pages/__index.js';


/** ----------------------------------------------------------------------------------------
 *  Validate Login Component rendering
 * ---------------------------------------------------------------------------------------- */ 
describe('|--------------------- login-form.test.js render ---------------------|', () => {

    // -- Hook to render page before each test.
    beforeEach(async () => {
        // render page.
        render(<Provider store={store}>
                <BrowserRouter>
                    <Login />
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
    test('renders Login page', () => {
        expect(screen.getByText("Please Enter your Credentials")).toBeInTheDocument();
    });

    // -- Validate inputs are empty.
    test('Inputs Initially empty', () => { 
        // Find input fields.
        const emailInputElement = screen.getByPlaceholderText("Enter your email");
        const pwdInputElement   = screen.getByPlaceholderText("Enter your password");

        // Verify inputs are empty or properly initialized.
        expect(emailInputElement.value).toBe('');
        expect(pwdInputElement.value).toBe('');
    });

    // -- Validate input "email" populates correctly.
    test('Input populate correctly "email"', () => {
        // Find input fields.
        const emailInputElement = screen.getByPlaceholderText("Enter your email");
        // Enter in a text.
        userEvent.type(emailInputElement, "test@testing.com");
        // Verify that text showed up in input textbox.
        expect(emailInputElement.value).toBe("test@testing.com");
    });

    // -- Validate input "password" populates correctly.
    test('Input populate correctly "password"', () => {
        // Find input fields.
        const pwdInputElement   = screen.getByPlaceholderText("Enter your password");
        // Enter in a text.
        userEvent.type(pwdInputElement, "password");
        // Verify that text showed up in input textbox.
        expect(pwdInputElement.value).toBe("password");
    });

    // -- Add Login button is responsive.
    test('Validate "Add Login" button is being called when pressed', () => {
        // Mock onSubmit button.
        const handleOnSubmitMock = jest.fn();
        screen.getByTestId('login-form').onsubmit = handleOnSubmitMock;

        // Select button.
        fireEvent.click(screen.getByRole("button", { name: "Login" }));

        // Verify that button calls onsubmit.
        expect(handleOnSubmitMock).toHaveBeenCalled();
    });
  
});