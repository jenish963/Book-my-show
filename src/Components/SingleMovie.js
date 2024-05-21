import { Box, Button, Grid, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GradeIcon from '@mui/icons-material/Grade';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import { useLocation, useNavigate } from 'react-router-dom';

function SingleMovie() {

    const [movieData, setMovieData] = useState({})
    const location = useLocation();
    const navigate = useNavigate();

    const fetchMovieData = (id) => {
        axios.get("https://www.omdbapi.com/?page=2&apikey=8d9f24de&i=" + id)
            .then((res) => setMovieData(res.data))
    }

    useEffect(() => {
        fetchMovieData(location.state.movieId)
    }, [])

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} columns={16}>
                <Grid item xs={8} style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={movieData.Poster} alt='poster' />
                </Grid>
                <Grid item xs={8} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '24px' }}>
                    <Typography style={{ fontSize: '24px', fontWeight: 600 }}>{movieData.Title}</Typography>
                    <Typography stylr={{ fontSize: '20px', fontWeight: 500 }}>{movieData.Plot}</Typography>
                    <Typography style={{ display: 'flex', gap: '6px' }}><EmojiEventsIcon style={{ color: 'gold' }} />{movieData.Awards}</Typography>
                    <Typography style={{ display: 'flex', gap: '6px' }}><GradeIcon style={{ color: 'blue' }} />{movieData.Ratings && movieData.Ratings[0].Value}</Typography>
                    <Typography style={{ display: 'flex', gap: '6px' }}><MovieFilterIcon /> {movieData.Released}</Typography>
                    <Button
                        onClick={() => navigate('/time', { state: { id: movieData.imdbID } })}
                        style={{ maxWidth: '232px', width: '100%', color: 'white', fontWeight: 600, fontSize: '18px', borderRadius: '8px', background: 'red', textTransform: 'none' }}>
                        Book Tickets
                    </Button>
                </Grid>
            </Grid>
        </Box>

    )
}

export default SingleMovie
