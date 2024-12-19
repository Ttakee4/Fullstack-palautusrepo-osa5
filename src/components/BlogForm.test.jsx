import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> calls a prop as a return with correct information when a blog is created', async () => {
  const user = userEvent.setup()
  const addBlog = vi.fn()

  render(<BlogForm createBlog={addBlog} />)

  const title = screen.getByPlaceholderText('title here')
  const author = screen.getByPlaceholderText('author here')
  const url = screen.getByPlaceholderText('url here')
  const createButton = screen.getByText('create')

  await user.type(title, 'The title here')
  await user.type(author, 'Author Test')
  await user.type(url, 'www.testi.fi')
  await user.click(createButton)

  //   console.log(addBlog.mock.calls[0][0])
  //   console.log(addBlog.mock.calls[0][0].title)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('The title here')
  expect(addBlog.mock.calls[0][0].author).toBe('Author Test')
  expect(addBlog.mock.calls[0][0].url).toBe('www.testi.fi')
})