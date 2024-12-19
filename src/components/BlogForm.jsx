import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      user: ''
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <h2>create new</h2>
        <div>
        title:
          <input
            value={newTitle}
            onChange={event => setNewTitle(event.target.value)}
            placeholder='title here'
          />
        </div>
        <div>
        author:
          <input
            value={newAuthor}
            onChange={event => setNewAuthor(event.target.value)}
            placeholder='author here'
          />
        </div>
        <div>
        url:
          <input
            value={newUrl}
            onChange={event => setNewUrl(event.target.value)}
            placeholder='url here'
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm