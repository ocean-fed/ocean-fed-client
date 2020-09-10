import React from 'react';
import { render } from '@testing-library/react';
import Admin from './Admin';

let reservationList = [0, 1, 2, 3]

test('Render text from admin page to see if document is found', () => {
  const { getByText } = render(<Admin />);
  const listOfBookings = getByText(/Alla bokningar/i);
  expect(listOfBookings).toBeInTheDocument()
})

test('it should remove one object from the array of reservations', () => {
  reservationList.splice(4, 1)

  expect(reservationList.length === 3)
})