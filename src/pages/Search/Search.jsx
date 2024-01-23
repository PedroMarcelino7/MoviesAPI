import styles from './Search.module.css'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Container, Grid, Typography } from '@mui/material'
import MovieCard from '../../components/MovieCard/MovieCard'

const searchURL = import.meta.env.VITE_SEARCH
const apiKey = import.meta.env.VITE_API_KEY

const Search = () => {
    const [searchParams] = useSearchParams()
    const [movies, setMovies] = useState([])
    const query = searchParams.get("q")

    const getSearchedMovies = async (url) => {
        const res = await fetch(url)
        const data = await res.json()

        setMovies(data.results)
    }

    useEffect(() => {
        const searchWithQueryURL = `${searchURL}?${apiKey}&query=${query}`

        getSearchedMovies(searchWithQueryURL)
    }, [query])

    return (
        <Container maxWidth={'xl'}>
            {/* <Typography>
                Resultados da busca: <span>{query}</span>
            </Typography> */}

            <Grid container py={5} spacing={5}>
                {movies && movies.map((movie) => (
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

export default Search