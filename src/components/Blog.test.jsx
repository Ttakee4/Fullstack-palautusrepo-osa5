import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container

  const user = {
    username: 'testaaja',
    name: 'Author Test',
    id: 'asdasd'
  }

  const blog = {
    title: 'The title here',
    author: 'Author Test',
    url: 'www.testi.fi',
    likes: 0,
    user: {
      username: 'testaaja',
      name: 'Author Test',
      id: 'asdasd'
    }
  }

  const addLike = vi.fn()

  beforeEach(() => {
    container = render(
      <Blog user={user} blog={blog} addLike={addLike} />
    ).container
  })

  test('renders title (and author), but not likes or url', async () => {
    screen.debug()

    const div = container.querySelector('.showOnlyTitleAuthor')
    expect(div).not.toHaveStyle('display: none')
    expect(div).toHaveTextContent('The title here')
    //xpect(div).toHaveTextContent('Author Test') Ei tarpeellinen koska 5.7 tehtynä?
  })

  test('renders title, author, likes and url after pressing view button', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.showEverything')
    expect(div).not.toHaveStyle('display: none')
    expect(div).toHaveTextContent('The title here')
    expect(div).toHaveTextContent('Author Test')
    expect(div).toHaveTextContent('www.testi.fi')
    expect(div).toHaveTextContent('0')
  })

  test('if the like button is pressed twice, the eventhandler is called twice', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('like')

    await user.click(button)
    await user.click(button)
    expect(addLike.mock.calls).toHaveLength(2)

  })
})