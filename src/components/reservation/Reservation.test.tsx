import React from 'react';
import { render, fireEvent, getByLabelText, queryByAttribute } from '@testing-library/react';
import Reservation from './Reservation';

test('renders search title text', () => {
  const { getByText } = render(<Reservation />)
  const searchTitle = getByText(/sök efter tillgängliga tider/i);
  expect(searchTitle).toBeInTheDocument();
})

test('it should enter 2 guests in the numOfSeats input-field', () => {
  const { container } = render(<Reservation />)
  const getById = queryByAttribute.bind(null, 'id');

  const dom = render(<Reservation />);
  const numOfSeatsInput = getById(dom.container, 'numOfSeats'); 
  
  fireEvent.change(numOfSeatsInput, { target: {value: 2 }});

  expect(numOfSeatsInput).toHaveValue(2);
})

test('it should set 2020-09-20 as date', () => {
  const { container } = render(<Reservation />)
  const getById = queryByAttribute.bind(null, 'id');

  const dom = render(<Reservation />);
  const dateInput = getById(dom.container, 'date'); 

  fireEvent.change(dateInput, { target: { value: '2020-09-20'}});
  expect(dateInput).toHaveValue('2020-09-20');
})

test('it should submit date and amount of guests and choose the seating at 18.00', () => {
  const { container } = render(<Reservation />);
  const getById = queryByAttribute.bind(null, 'id');

  const dom = render(<Reservation />);

  const getTimesButton = getById(dom.container, 'getTimesButton');
  fireEvent.click(getTimesButton);

  const eighteen = getByText(/18/);
  fireEvent.click(eighteen);

  expect(eighteen).toBeCalled();
})

test('it should enter name, email and phone in the form and then submit', () => {
  const { container } = render(<Reservation />)
  const getById = queryByAttribute.bind(null, 'id');

  const dom = render(<Reservation />)

  const nameInput = getById(dom.container, 'name')
  const emailInput = getById(dom.container, 'email')
  const phoneInput = getById(dom.container, 'phone')

  fireEvent.change(nameInput, { target: { value: 'Johan'}});
  fireEvent.change(emailInput, { target: { value: 'johan@gmail.com'}});
  fireEvent.change(phoneInput, { target: { value: '0707070707'}});

  expect(nameInput).toHaveValue('Johan');
  expect(emailInput).toHaveValue('johan@gmail.com');
  expect(phoneInput).toHaveValue('0707070707');

})

test('it should try to make and reservation on a fully booked seating and fail', () => {
  const { container } = render(<Reservation />)
  const dom = render(<Reservation />)
  const getById = queryByAttribute.bind(null, 'id');



})