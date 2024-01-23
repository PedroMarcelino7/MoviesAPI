import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { useState } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.jsx'
import Movie from './pages/Movie/Movie.jsx'
import Search from './pages/Search/Search.jsx'

function App() {
  const [mode, setMode] = useState(true)

  const changeTheme = () => {
    setMode(prevMode => !prevMode)
  }

  const theme = createTheme({
    palette: {
      mode: mode ? 'dark' : 'light'
    }
  })

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Navbar />

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/movies/:id' element={<Movie />} />
            <Route path='/search' element={<Search />} />
            <Route path='*' element={<Home />} />
          </Routes>
        </Router>
        <Outlet />
      </ThemeProvider>
    </>
  )
}

export default App
