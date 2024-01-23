import styles from './MovieCard.module.css'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { Button, CardActionArea, CardActions, Box } from '@mui/material';
import { Link } from 'react-router-dom'
import RatingStars from '../RatingStars/RatingStars';

const imageURL = import.meta.env.VITE_IMG;

export default function MovieCard({ movie, showLink = true }) {
    return (
        <Card sx={{
            maxWidth: 345
        }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="450"
                    style={{ objectFit: 'cover', alignSelf: 'flex-start' }}
                    image={imageURL + movie.poster_path}
                    alt={movie.title}
                />
                <CardContent sx={{
                    paddingBottom: 1
                }}>
                    <Typography
                        variant="h6"
                        component="h1"
                        gutterBottom
                        noWrap
                    >
                        <Tooltip title={movie.title} placement="top-start">
                            {movie.title}
                        </Tooltip>
                    </Typography>
                    <Typography
                        className={styles.overflow}
                        variant="body2"
                        component="p"
                        color="text.secondary"
                    >
                        {movie.overview}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Button
                    size="small"
                    color="primary"
                    variant='outlined'
                >
                    <Tooltip title={movie.title} placement="right">
                        <Link className={styles.link} to={`/movies/${movie.id}`}>Details</Link>
                    </Tooltip>
                </Button>

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
            </CardActions>
        </Card>
    );
}
