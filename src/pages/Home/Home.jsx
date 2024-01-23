import styles from './Home.module.css'
import MovieCard from '../../components/MovieCard/MovieCard'
import { useState, useEffect } from 'react'
import { Container, Grid, Typography } from '@mui/material'

const moviesURL = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY

const Home = () => {
    const [topMovies, setTopMovies] = useState([])
    
    const getTopRatedMovies = async (url) => {
        const res = await fetch(url)
        const data = await res.json()

        setTopMovies(data.results)
    }

    useEffect(() => {
        const topRatedURL = `${moviesURL}top_rated?${apiKey}`

        getTopRatedMovies(topRatedURL)
    }, [])

    return (
        <Container maxWidth={'xl'}>
            {/* <Typography>
                TITULO DA PAGINA
            </Typography> */}

            <Grid container py={5} spacing={5}>
                {topMovies && topMovies.map((movie) => (
                    <Grid item
                        key={movie.id}
                        xs={12} sm={6} md={4} lg={3}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <MovieCard movie={movie} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default Home