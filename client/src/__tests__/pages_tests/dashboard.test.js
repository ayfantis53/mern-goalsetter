// npm installs
import { Provider       } from 'react-redux';
import { BrowserRouter  } from 'react-router';
import { render, screen } from '@testing-library/react';

// project imports
import { store     } from '../../app/store.js';
import { Dashboard } from '../../pages/__index.js';


/** ----------------------------------------------------------------------------------------
 *  Validate Dashboard Component rendering
 * ---------------------------------------------------------------------------------------- */ 
describe('|--------------------- register-form.test.js render ---------------------|', () => {

    // -- Hook to render page before each test.
    beforeEach(async () => {
        // render page.
        render(<Provider store={store}>
                <BrowserRouter>
                    <Dashboard />
                </BrowserRouter>
               </Provider>);
    });

    // -- Validate page renders correctly.
    test('renders Dashboard page', () => {
        expect(screen.getByText("Welcome")).toBeInTheDocument();
        expect(screen.getByText("Goals Dashboards")).toBeInTheDocument();
        expect(screen.getByText("You have NOT set any Goals!")).toBeInTheDocument();
    });
  
});