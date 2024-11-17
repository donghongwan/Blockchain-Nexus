// tests/frontend/App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../src/App';

test('renders NexGen Bank title', () => {
    render(<App />);
    const linkElement = screen.getByText(/NexGen Bank/i);
    expect(linkElement).toBeInTheDocument();
});
