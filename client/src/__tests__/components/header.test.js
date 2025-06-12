// npm installs
import { Provider       } from 'react-redux';
import { BrowserRouter  } from "react-router";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// project imports
import { store  } from '../../app/store.js';
import { Header } from '../../components/__index.js';


/** ----------------------------------------------------------------------------------------
 *  Validate Header Component functionality
 * ---------------------------------------------------------------------------------------- */ 
describe('|--------------------- header.test.js ---------------------|', () => {

  // -- Hook to render Header before each test.
  beforeEach(() => {
      render(
        <Provider store={store}>
          <BrowserRouter>
              <Header />
          </BrowserRouter>
        </Provider>
      );
});

  // -- Validate "GoalSetter" title exists on web page.
  test('renders GoalSetter title', () => {
    expect(screen.getByText(/GoalSetter/i)).toBeInTheDocument();
  });

  // -- Validate "Login" title exists on web page.
  test('renders Login title', () => {
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  // -- Validate "Header" title exists on web page.
  test('renders Header page', () => {
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
  });
  
});

/** ----------------------------------------------------------------------------------------
 *  Validate Header Component functionality
 * ---------------------------------------------------------------------------------------- */ 
describe('|--------------------- header.test.js links ---------------------|', () => {

    // -- Hook to render Header before each test.
    beforeEach(() => {
        render(
        <Provider store={store}>
          <BrowserRouter>
              <Header />
          </BrowserRouter>
        </Provider>
      );
    });

    // -- Validate "GoalSetter" link works.
    test('Validate GoalSetter link navigates correctly', () => {
        // Find ExcerTracker link field.
        const linkGoalSetter = screen.getByRole('link', { name: "GoalSetter" });
        // Click on link.
        userEvent.click(linkGoalSetter);
        // Make sure its path is correct.
        expect(window.location.pathname).toBe('/');
    });

    // -- Validate "Login" button works.
    test('Validate Login button navigates correctly', () => {
        // Find Exercises button field.
        const linkLogin = screen.getByRole('link', { name: "Login" });
        // Click on button.
        userEvent.click(linkLogin);
        // Make sure its path is correct.
        expect(window.location.pathname).toBe('/login');
    });

    // -- Validate "Register" button works.
    test('Validate Register button navigates correctly', () => {
        // Find Register button field.
        const linkRegister= screen.getByRole('link', { name: "Register" });
        // Click on button.
        userEvent.click(linkRegister);
        // Make sure its path is correct.
        expect(window.location.pathname).toBe('/register');
    });
});