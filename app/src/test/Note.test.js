import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { fireEvent, prettyDOM } from '@testing-library/dom'
import Note from '../components/Note'

test('renders content', () => {
  const note = {
    content: 'This is a test',
    important: true
  }

  const component = render(<Note note={note}></Note>)
  component.getByText('This is a test')
  component.getByText('make not important')
  //expect(component.container).toHaveTextContent(note.content)
  //   const li = component.container.querySelector('li')
  //   console.log(prettyDOM(li))
})

test('clicking the button calls event handler once', () => {
  const note = {
    content: 'This is a test',
    important: true
  }

  const mockHandler = jest.fn()
  const component = render(
    <Note note={note} toggleImportance={mockHandler}></Note>
  )
  const button = component.getByText('make not important')
  fireEvent.click(button)

  expect(mockHandler).toHaveBeenCalledTimes(1)
  expect(mockHandler.mock.calls).toHaveLength(1)
})
