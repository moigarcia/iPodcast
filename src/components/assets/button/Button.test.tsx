import Button from './Button'
import { cleanup, render, fireEvent, screen } from '@testing-library/react';

afterEach(() => cleanup())

const onClickBtn = jest.fn()

describe('Button', () => {
  test('render button with text', () => {
    render(<Button action={onClickBtn} text="SAVE" />)

    expect(screen.getByText('SAVE')).toBeTruthy()
  })

  test('It a click button', () => {
    render(<Button action={onClickBtn} text="SAVE" />);

    fireEvent.click(screen.getByText('SAVE'))

    expect(onClickBtn).toHaveBeenCalledTimes(1)
  });
})