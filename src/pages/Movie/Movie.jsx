import styles from './Movie.module.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, CardMedia, Container, Grid, Typography } from '@mui/material'

const Movie = () => {
    const { id } = useParams()
    const [movie, setMovie] = useState(null)

    const moviesURL = import.meta.env.VITE_API
    const apiKey = import.meta.env.VITE_API_KEY
    const imageURL = import.meta.env.VITE_IMG;

    const getMovie = async (url) => {
        const res = await fetch(url)
        const data = await res.json()

        setMovie(data)
    }

    useEffect(() => {
        const movieURL = `${moviesURL}${id}?${apiKey}`
        getMovie(movieURL)
    }, [])

    return (
        <Container
            maxWidth={'xl'}
        >
            <Typography
                component="h1"
                variant='h4'
                textAlign='center'
                pt={5}
            >
                {movie && movie.title}
            </Typography>

            <Grid
                container
                py={5}
                spacing={5}
                display='flex'
                justifyContent='center'
                alignItems='center'
            >
                <Grid
                    item
                    xs={12} sm={6} md={4} lg={3}
                    display='flex'
                    justifyContent='right'
                >
                    {movie &&
                        <CardMedia
                            component="img"
                            height="450"
                            style={{ objectFit: 'contain', alignSelf: 'flex-start' }}
                            image={imageURL + movie.poster_path}
                            alt={movie.title}
                        />
                    }
                </Grid>

                <Grid
                    item
                    xs={12} sm={6} md={4} lg={3}
                    display='flex'
                    justifyContent='left'
                >
                    <Typography textAlign='center'>
                        Teste
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Movie