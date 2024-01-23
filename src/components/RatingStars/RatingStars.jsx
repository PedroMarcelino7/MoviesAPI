import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';

export default function RatingStars({ rate }) {
    return (
        <Tooltip title={rate.toFixed(1)} placement="left">
            <Stack spacing={1}>
                <Rating name="half-rating-read" defaultValue={rate.toFixed(1) / 2} precision={0.1} readOnly />
            </Stack>
        </Tooltip>
    );
}