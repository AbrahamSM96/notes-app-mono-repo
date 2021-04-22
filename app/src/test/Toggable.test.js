import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { fireEvent, prettyDOM } from '@testing-library/dom'
import Toggable from '../components/Toggable'
import i18n from '../i18n'

describe('<Toggable />', () => {
  const buttonLabel = 'show'
  let component
  // renderizar el componente para poder testearlo
  beforeEach(() => {
    component = render(
      <Toggable buttonLabel={buttonLabel}>
        <div>testDivContent</div>
      </Toggable>
    )
  })

  test('renders its children', () => {
    component.getByText('testDivContent')
  })

  test('renders its children', () => {
    const el = component.getByText('testDivContent')
    expect(el.parentNode).toHaveStyle('display: none')
  })
  test('after clicking its children must be shown', () => {
    const button = component.getByText(buttonLabel)
    //con este simulamos un click
    fireEvent.click(button)

    const el = component.getByText('testDivContent')
    expect(el.parentNode).not.toHaveStyle('display: none')
  })

  test('toggled content can be closed', () => {
    const button = component.getByText(buttonLabel)
    //con este simulamos un click
    fireEvent.click(button)

    const el = component.getByText('testDivContent')
    expect(el.parentNode).not.toHaveStyle('display: none')
    const cancelButton = component.getByText(i18n.TOGGABLE.CANCEL_BUTTON)

    fireEvent.click(cancelButton)
    expect(el.parentNode).toHaveStyle('display: none')
  })
})
