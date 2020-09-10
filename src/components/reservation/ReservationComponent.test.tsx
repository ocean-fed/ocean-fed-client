import React from 'react';
import { render, fireEvent, getByLabelText, queryByAttribute } from '@testing-library/react';
import ReservationComponent from './ReservationComponent';

test('renders search title text to see if document is found', () => {
  const { getByText } = render(<ReservationComponent />)
  const searchTitle = getByText(/sök efter tillgängliga tider/i);
  expect(searchTitle).toBeInTheDocument();
})

test('it should enter 2 guests in the numOfSeats input-field', () => {
  const { container } = render(<ReservationComponent />)
  const getById = queryByAttribute.bind(null, 'id');

  const dom = render(<ReservationComponent />);
  const numOfSeatsInput = getById(dom.container, 'numOfSeats'); 
  
  fireEvent.change(numOfSeatsInput, { target: {value: 2 }});

  expect(numOfSeatsInput).toHaveValue(2);
})

test('it should set 2020-09-20 as date', () => {
  const { container } = render(<ReservationComponent />)
  const getById = queryByAttribute.bind(null, 'id');

  const dom = render(<ReservationComponent />);
  const dateInput = getById(dom.container, 'date'); 

  fireEvent.change(dateInput, { target: { value: '2020-09-20'}});
  expect(dateInput).toHaveValue('2020-09-20');
})
