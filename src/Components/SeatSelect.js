import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function SeatSelect() {
    const location = useLocation();
    const navigate = useNavigate();

    const seatArray = [
        { line: 'A', seat: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
        { line: 'B', seat: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
        { line: 'C', seat: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
        { line: 'D', seat: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
        { line: 'E', seat: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
    ]

    const [selectedSeat, setSelectedSeat] = useState([])

    const selectSeats = (line, seats, theater, time, movie) => {
        setSelectedSeat([...selectedSeat, { line: line, seat: seats, theaterName: theater, showtime: time, movieName: movie }])
    }

    useEffect(() => {
        const bookedSeats = localStorage.getItem("booked")
        setSelectedSeat(JSON.parse(bookedSeats) || [])
    }, [])

    const handleTicketBooking = () => {
        if(selectedSeat.length === 0) {
            toast.error("Please select seats first.")
        } else {
            localStorage.setItem('booked', JSON.stringify(selectedSeat))
            toast.success("Tickets Booked Successfully.")
        }
    }

    return (
        <Box sx={{ display: 'flex', gap: '48px', flexDirection: 'column' }}>
            <Typography style={{ textAlign: 'center', fontWeight: 600, fontSize: '24px' }}>{location.state.movieData.Title}</Typography>
            <Box style={{ display: 'flex', justifyContent: 'center', gap: '40px' }}>
                <Typography style={{ fontSize: '20px', fontWeight: 500 }}>{location.state.theater}</Typography>
                <Typography style={{ fontSize: '20px', fontWeight: 500 }}>{location.state.time}</Typography>
            </Box>
            {
                seatArray.map((item, index) => (
                    <Grid container spacing={2} columns={16} key={index}>
                        <Grid item xs={6} style={{ display: 'flex', justifyContent: 'end' }}>
                            <Box>{item.line}</Box>
                        </Grid>
                        <Grid item xs={10} style={{ display: 'flex', gap: '24px' }}>
                            {item.seat.map((t, i) => (
                                <Box
                                    key={i}
                                    onClick={() => selectSeats(item.line, t, location.state.theater, location.state.time, location.state.movieData.Title)}
                                    style={{ cursor: 'pointer', border: '1px solid black', borderRadius: '8px', padding: '8px', background: selectedSeat.find((i) => (i.line === item.line) && (i.seat === t) && (i.theaterName === location.state.theater) && (i.showtime === location.state.time) && (i.movieName === location.state.movieData.Title)) ? 'antiquewhite' : 'white' }}>
                                    {t}
                                </Box>
                            ))}
                        </Grid>
                    </Grid>
                ))
            }
            <Button
                onClick={handleTicketBooking}
                style={{ maxWidth: '232px', width: '100%', color: 'white', fontWeight: 600, fontSize: '18px', alignSelf: 'center', borderRadius: '8px', background: 'red', textTransform: 'none' }}>
                Book Tickets
            </Button>
        </Box>
    )
}

export default SeatSelect
