import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')   
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  // const [title, setTitle] = useState('')
  // const [author, setAuthor] = useState('')
  // const [url, setUrl] = useState('')
  //const [newNoteVisible, setNewNoteVisible] = useState(false) Tarvitsee myöhemmin? Loginformiin?

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {    
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')    
    if (loggedUserJSON) {      
      const user = JSON.parse(loggedUserJSON)      
      setUser(user)      
      blogService.setToken(user.token)    
    }  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try{
      window.localStorage.removeItem('loggedBlogappUser')
    }catch (exception) {
      setErrorMessage('Something unexpect happened')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
        .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setUser(user) //En ainakaan tässä vaiheessa keksinyt/ymmärtänyt miten/voiko tämän asettaa komponentissa
        setSuccessMessage(`a new blog ${blogObject.title} by ${blogObject.author} has been added`)

        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
  }

  const addLike = (id, blogObject) => {
    blogService
      .update(id, blogObject)
       .then(updatedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))
        setUser(user)
       })
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const blogFormRef = useRef()

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} />

        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={successMessage} />
      <form onSubmit={handleLogout}>
        <div>
          <p>{user.name} logged in <button type="submit">logout</button></p>
        </div>
      </form>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog}/>
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} addLike={addLike}/>
      )}
    </div>
  )
}

export default App