import React from 'react'
import { Card, Typography, Button } from '@material-ui/core'

const Appointment = ({data, rateAppointment, currentAppointment}) => {
  return (
    <Card className="doctor-card" style={{width: "90vw", marginLeft:"20px"}}>
        <Typography className="doctor-name">Doctor Name: {data.doctorName}</Typography>
        <Typography>Date: {data.appointmentDate}</Typography>
        <Typography>Symptoms: {data.symptoms}</Typography>
        <Typography>PriorMedicalHistory: {data.priorMedicalHistory}</Typography>
        <Typography>
          <Button color="primary" onClick={() => {rateAppointment(true);currentAppointment(data)}} variant="contained">
            RATE APPOINTMENT
          </Button>
        </Typography>
      </Card>
  )
}

export default Appointment