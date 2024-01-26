import styles from './Movie.module.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, CardMedia, Container, Grid, Typography, Card } from '@mui/material'
import RatingStars from '../../components/RatingStars/RatingStars'
import FlipIcon from '@mui/icons-material/AutorenewRounded';

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

    // const [movieImage, setMovieImage] = useState('')

    // useEffect(() => {
    //     if (movie) {
    //         setMovieImage(movie.poster_path)
    //     }
    // }, [movie])

    // const handleChangeImage = () => {
    //     movieImage === movie.poster_path ? setMovieImage(movie.backdrop_path) : setMovieImage(movie.poster_path)
    // }

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
                        <Box
                            sx={{
                                position: 'relative',
                                borderRadius: '10px',
                                backgroundColor: 'none',
                                boxShadow: '0 5px 10px black'
                            }}
                        >
                            <CardMedia
                                sx={{
                                    borderRadius: '10px',
                                }}
                                component="img"
                                image={imageURL + movie.poster_path}
                                alt={movie.title}
                            />

                            {/* <Box
                                onClick={() => handleChangeImage()}
                            >
                                <FlipIcon sx={{
                                    position: 'absolute',
                                    bottom: 10,
                                    left: 10,
                                    width: '30px',
                                    height: '30px',
                                    cursor: 'pointer',
                                    backgroundColor: '#000',
                                    borderRadius: '50%',
                                    boxShadow: '0 0 15px #353535'
                                }}
                                />
                            </Box> */}
                        </Box>
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
                        >
                            <Box>
                                <Typography>
                                    budget
                                </Typography>
                                <Typography>
                                    {movie.budget}
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