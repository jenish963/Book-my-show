import { Box, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function TimeSelect() {

    const [movieData, setMovieData] = useState({})
    const location = useLocation();
    const navigate = useNavigate();

    const timeArray = [
        { theater: 'Theater A', time: ['7:30 AM', '00:30 PM', "05:30 PM"] },
        { theater: 'Theater B', time: ['7:30 AM', '00:30 PM', "05:30 PM"] },
        { theater: 'Theater C', time: ['7:30 AM', '00:30 PM', "05:30 PM"] },
        { theater: 'Theater D', time: ['7:30 AM', '00:30 PM', "05:30 PM"] },
        { theater: 'Theater E', time: ['7:30 AM', '00:30 PM', "05:30 PM"] },
    ]

    const [availableTime, setAvailableTime] = useState(timeArray)

    const fetchMovieData = (id) => {
        axios.get("https://www.omdbapi.com/?page=2&apikey=8d9f24de&i=" + id)
            .then((res) => setMovieData(res.data))
    }

    useEffect(() => {
        fetchMovieData(location.state.id)
    }, [])

    return (
        <Box sx={{ display: 'flex', gap: '48px', flexDirection: 'column' }}>
            <Typography style={{ textAlign: 'center', fontWeight: 600, fontSize: '24px' }}>{movieData.Title}</Typography>
            {
                availableTime.map((item, index) => (
                    <Grid container spacing={2} columns={16} key={index}>
                        <Grid item xs={8} style={{ display: 'flex', justifyContent: 'center' }}>
                            <Box style={{ border: '1px solid black', borderRadius: '8px', padding: '8px' }}>{item.theater}</Box>
                        </Grid>
                        <Grid item xs={8} style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
                            {item.time.map((t, i) => (
                                <Box
                                    key={i}
                                    onClick={() => navigate('/seat', { state: { time: t, movieData: movieData, theater: item.theater } })}
                                    style={{ cursor: 'pointer', border: '1px solid black', borderRadius: '8px', padding: '8px', background: 'antiquewhite' }}>
                                    {t}
                                </Box>
                            ))}
                        </Grid>
                    </Grid>
                ))
            }
        </Box>
    )
}

export default TimeSelect
