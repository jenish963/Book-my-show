import { Box, Grid, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {

    const [movieData, setMovieData] = useState([])
    const navigate = useNavigate();

    const fetchData = () => {
        axios.get("https://www.omdbapi.com/?page=2&apikey=8d9f24de&s=Batman")
            .then((res) => setMovieData(res.data.Search))
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {movieData.map((_, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <img 
                        src={_.Poster} 
                        alt={_.imdbID} 
                        style={{ width: '100%', height: '300px', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', borderRadius: '16px', cursor: 'pointer' }}
                        onClick={() => navigate('/movie', {state: {movieId: _.imdbID}})}
                         />
                        <Typography style={{ fontSize: '24px' }}>{_.Title} <span style={{ fontSize: '20px' }}>({_.Year})</span></Typography>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default Home
