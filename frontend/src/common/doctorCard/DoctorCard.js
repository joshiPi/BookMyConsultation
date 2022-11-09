import { Button, Paper, Typography } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import React from 'react'
import "./doctorCard.css"

function DoctorCard({name, speciality, rating, viewDetails, setCurrentDoctor, doctor, viewAppointment}) {
  return (
    <Paper className="doctor-card">
        <Typography className="doctor-name">
            Doctor Name: {name}
        </Typography>
        <Typography>
            Speciality: {speciality}
        </Typography>
        <Typography className='rating'>
            Rating: <Rating value={rating}/>
        </Typography>
        <Typography>
          <Button onClick={() => {setCurrentDoctor(doctor);viewAppointment(true)}} color='primary' variant='contained'>
            BOOK APPOINTMENT
          </Button>
          <Button onClick={() => {setCurrentDoctor(doctor);viewDetails(true)}} className='doctor-details' variant='contained'>
            VIEW DETAILS
          </Button>
        </Typography>
    </Paper>
  )
}

export default DoctorCard