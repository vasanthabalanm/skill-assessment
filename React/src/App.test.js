import { render, screen } from '@testing-library/react'
import App from './App'

test('renders learn react link', () => {
  render(<App />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})


// import { render, screen } from '@testing-library/react';
// import React from 'react';
// import App from '../App.jsx';

// describe('App tests', () => {
//     it('should contains the heading 1', () => {
//     render(<App />);
//         const heading = screen.getByText(/Hello world! I am using React/i);
//         expect(heading).toBeInTheDocument()
//     });
// });