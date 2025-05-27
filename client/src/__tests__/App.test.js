// npm installs
import '@testing-library/jest-dom'
import { Provider       } from 'react-redux';
import { BrowserRouter  } from 'react-router';
import { render, screen } from '@testing-library/react';

// project imports
import App from '../App';
import { store } from '../app/store';
import { Dashboard, Login, Register } from '../pages/__index.js';


/* --------------------------------------------------------------------------------------
* UNIT TESTS FOR APP.JS
-------------------------------------------------------------------------------------- */ 
describe('|--------------------- App.test.js ---------------------|',()=>{
  test('renders default page', () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByText(/GoalSetter/i)).toBeInTheDocument();
  });
  
  test('renders login page', () => {
    const pathname = '/login';
    const { getByTestId} = render(
      <Provider store={store}>
        <BrowserRouter>
          <Login location = {{pathname}}/>
        </BrowserRouter>
      </Provider>
    );
    expect(getByTestId('login-display')).toHaveTextContent('Please Enter your Credentials');
  });
  
  test('renders register page', () => {
    const pathname = '/register';
    const { getByTestId} = render(
      <Provider store={store}>
        <BrowserRouter>
          <Register location = {{pathname}}/>
        </BrowserRouter>
      </Provider>
    );
    expect(getByTestId('register-display')).toHaveTextContent('Please create an Account');
  });
  
});


