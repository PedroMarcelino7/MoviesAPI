import styles from './Movie.module.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Container, Grid, Typography } from '@mui/material'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

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
            >{movie && movie.title}</Typography>

            
        </Container>
    )
}

export default Movie