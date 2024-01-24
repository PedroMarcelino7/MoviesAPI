import styles from './Movie.module.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, CardMedia, Container, Grid, Typography, Card } from '@mui/material'
import RatingStars from '../../components/RatingStars/RatingStars'

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

            {movie &&
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
                        justifyContent='right'
                        sx={{
                            display: { xs: 'none', sm: 'flex' }
                        }}
                    >
                        <Card
                            height={450}
                            sx={{
                                position: 'relative'
                            }}
                        >
                            <CardMedia
                                sx={{
                                    borderRadius: '10px',
                                    boxShadow: '0 5px 10px black'
                                }}
                                component="img"
                                image={imageURL + movie.poster_path}
                                alt={movie.title}
                            />
                            {/* ICONE DE MUDAR IMAGEM */}
                        </Card>
                    </Grid>

                    <Grid
                        item
                        xs={12} sm={6} md={4} lg={3}
                    >
                        <Box
                            height={450}
                            display='flex'
                            flexDirection='column'
                            justifyContent='space-between'
                            alignItems='center'
                        >
                            <Box>
                                <Typography>
                                    budget
                                </Typography>
                            </Box>
                            {/*
                                genres
                                overview
                                production companies / countrys
                                release date
                                runtime
                            */}

                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <RatingStars rate={movie.vote_average} />

                                <Typography
                                    variant='body2'
                                    ml={1}
                                >
                                    ({movie.vote_count})
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            }
        </Container>
    )
}

export default Movie