'use client';

import { useState, useEffect } from "react";
import { DateCalendar, TimePicker } from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import { Typography } from "@mui/material";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function Booking() {
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(()=>{
        setMounted(true);
    }, []);

    if(!mounted) return null;

    const handleBooking = async () => {
        if(selectedDate  && selectedTime) {
            const response = await fetch('/api/student/booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    date: dayjs(selectedDate).format('YYYY-MM-DD'),
                    time: dayjs(selectedTime).format('h:mm A')
                })
            })

            const data = await response.json();
            console.log(data);
        }
    }

    return (
        <Box className="max-w-4x1 mx-auto justify-center align-middle ">
            <Typography variant="h3" component="h2">
                Schedule Appointment with Counselor
            </Typography>
            <Box className="w-full">
                <DateCalendar 
                disablePast
                 value={selectedDate}
                 onChange={(newDate) => setSelectedDate(newDate)}
                />
                <TimePicker 
                 views={["hours", "minutes"]}
                 value={selectedTime}
                 onChange={(newTime) => setSelectedTime(newTime)}
                />
            </Box>
            <Button 
             variant="contained" 
             size="small"
             onClick={handleBooking}
            >
                Submit
            </Button>
        </Box>
    );
}