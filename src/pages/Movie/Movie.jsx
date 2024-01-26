import styles from './Movie.module.css'
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, CardMedia, Container, Grid, Typography, Paper } from '@mui/material'
import RatingStars from '../../components/RatingStars/RatingStars'
import Stack from '@mui/material/Stack';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

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

    const [showOverview, setShowOverview] = useState(false)

    const handleShowOverview = () => {
        setShowOverview(!showOverview)
    }

    return (
        <>{movie &&
            <Container
                maxWidth='xl'
            >

                <Box>
                    <Typography
                        component="h1"
                        variant='h4'
                        textAlign='center'
                        pt={5}
                    >
                        {movie.title}
                    </Typography>

                    <Typography
                        component="h2"
                        variant='h6'
                        textAlign='center'
                    >
                        {movie.tagline}
                    </Typography>
                </Box>

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
                        sx={{
                            position: 'relative',
                            display: { xs: 'none', sm: 'flex' },
                            flexDirection: 'column',
                            justifyContent: 'right',
                            gap: '15px'
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

                            {showOverview &&
                                <Box
                                    position='absolute'
                                    top='0'
                                    left='0'
                                    height='100%'
                                    backgroundColor='rgba(0, 0, 0, 0.85)'
                                    padding='1rem'
                                    textAlign='justify'
                                    borderRadius='7px'
                                >
                                    <Typography
                                        component='p'
                                        variant='body1'
                                    >
                                        {movie.overview}
                                    </Typography>
                                </Box>
                            }

                            <Box
                                position='absolute'
                                bottom='5px'
                                left='5px'
                            >
                                <Paper
                                    onClick={() => (handleShowOverview())}
                                    elevation={0}
                                    sx={{
                                        paddingInline: '10px',
                                        paddingBlock: '5px',
                                        textAlign: 'center',
                                        fontSize: '1.3rem',
                                        cursor: 'pointer'
                                    }}>
                                    Overview
                                </Paper>
                            </Box>
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}>
                            <RatingStars rate={movie.vote_average} />

                            <Typography
                                component='p'
                                variant='body2'
                                ml={1}
                            >
                                ({movie.vote_count})
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid
                        item
                        xs={12} sm={6} md={4} lg={3}
                    >
                        <Box
                            display='flex'
                            flexDirection='column'
                            justifyContent='flex-start'
                            gap='25px'
                        >
                            <Box>
                                <Typography
                                    component='h1'
                                    variant='h4'
                                >
                                    Release Date
                                </Typography>
                                <Typography
                                    component='h2'
                                    variant='h6'
                                >
                                    {movie.release_date}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography
                                    component='h1'
                                    variant='h4'
                                >
                                    Runtime
                                </Typography>
                                <Typography
                                    component='h2'
                                    variant='h6'
                                >
                                    {movie.runtime} minutes
                                </Typography>
                            </Box>

                            <Box>
                                <Typography
                                    component='h1'
                                    variant='h4'
                                >
                                    Budget
                                </Typography>
                                <Typography
                                    component='h2'
                                    variant='h6'
                                >
                                    ${movie.budget}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography
                                    component='h1'
                                    variant='h4'
                                >
                                    Companies
                                </Typography>

                                <Stack
                                    spacing={1}
                                    direction="row"
                                    useFlexGap
                                    flexWrap="wrap"
                                >
                                    {movie.production_companies.map((company, index) => (
                                        <Item key={index}>{company.name} {company.origin_country ? `(${company.origin_country})` : null}</Item>
                                    ))}
                                </Stack>
                            </Box>

                            <Box>
                                <Typography
                                    component='h1'
                                    variant='h4'
                                >
                                    Genres
                                </Typography>

                                <Stack
                                    spacing={1}
                                    direction="row"
                                    useFlexGap
                                    flexWrap="wrap"
                                >
                                    {movie.genres.map((genre, index) => (
                                        <Item key={index}>{genre.name}</Item>
                                    ))}
                                </Stack>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        }</>
    )
}

export default Movie