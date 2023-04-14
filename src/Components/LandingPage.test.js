import { fireEvent, render, screen } from '@testing-library/react';
import LandingPage from './LandingPage';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

jest.mock(axios);

describe('test cases', () => {
    test('renders landing page', () => {
        render(<LandingPage />);
        const dataLoading = screen.getByText(/...loading/i);
        expect(dataLoading).toBeInTheDocument();
    });

    test('exist button', () => {
        render(<LandingPage />);
        userEvent.type(screen.getByLabelText('selectbox'), 'Naboo')
        const getBtn = screen.getByText(/Submit/i);
        expect(getBtn).toBeInTheDocument();
        fireEvent.click(screen.getByText(/Submit/i));
    });

    test('exist input box', () => {
        render(<LandingPage />);
        const getSelect = screen.getByLabelText(/selectbox/i);
        expect(getSelect).toBeTruthy();
    });

    test('pagination', () => {
        render(<LandingPage />);
        const btnList = screen.getByRole('button');
        expect(btnList).toBeTruthy();
    });

})
