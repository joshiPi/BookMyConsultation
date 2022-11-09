import {
  Modal,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import React, { useState, useEffect } from "react";

const BookAppointment = ({ viewDetails, setViewDetails, doctor }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "0",
      paddingBottom: "20px",
    },
  };
  const [selectedDate, handleDateChange] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);
  console.log(selectedDate.fo);

  useEffect(() => {
    if (doctor?.id) {
      (function () {
        fetch(
          `/doctors/${doctor?.id}/timeSlots?date=${selectedDate.toISOString()}`
        )
          .then((data) => data.json())
          .then((data) => setTimeSlots(data.timeSlot))
          .catch((err) => console.log(err));
      })();
    }
  }, [selectedDate]);
  console.log(timeSlots);
  const bookAppointment = (e) => {
    e.preventDefault()
    // console.log(e.target.elements.timeSlot);
    if(!global.localStorage.getItem('token')) {
      alert("Login to book Appointment")
      return
    }
    const opts = {
      method: "POST",
      headers: {
        "authorization": `Bearer ${global.localStorage.getItem("token")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        doctorId: doctor.id,
        doctorName: e.target.elements.doctorName.value,
        userEmailId: global.localStorage.getItem('userEmail'),
        userName: global.localStorage.getItem('userEmail'),
        userId: global.localStorage.getItem('userEmail'),
        timeSlot: e.target.elements.timeSlot.value,
        appointmentDate:`${selectedDate.getFullYear()}-${selectedDate.getMonth()}-${selectedDate.getMonth()}`,
        symptoms: e.target.elements.symptoms.value,
        priorMedicalHistory: e.target.elements.history.value,

      }),
    };
    fetch("/appointments", opts)
    .then((data) => data)
    .then((data) => {
      if(data?.code) {
        alert("Error Please try again")
        return
      }
      alert("Successfully Booked")
      setViewDetails(false)
    })

  }

  return (
    <div>
      <Modal
        open={viewDetails}
        style={customStyles}
        onClose={() => setViewDetails(false)}
        onRequestClose={() => setViewDetails(false)}
        // contentLabel="Details Modal"
        shouldFocusAfterRender={true}
        preventScroll={false}
        ariaHideApp={false}
      >
        <div
          style={{
            backgroundColor: "#fff",
            width: "calc(30vw + 20px)",
            marginLeft: "40vw",
            marginTop: "100px",
          }}
        >
          <div className="modal-header" style={{ width: "30vw" }}>
            Book an Appointment
          </div>
          <div style={{ padding: "20px" }}>
            <form className="appointment-form"
            onSubmit={(e) => bookAppointment(e)}
            >
              <FormControl
                style={{ display: "block", paddingBottom: "20px" }}
                // required
              >
                {/* <InputLabel htmlFor="my-input">Doctor Name</InputLabel> */}
                <TextField
                  disabled
                  id="standard-disabled"
                  label="Doctor Name"
                  //   defaultValue="Hello World"
                  variant="standard"
                  name="doctorName"
                  value={doctor?.firstName + " " + doctor?.lastName}
                />
              </FormControl>
              <FormControl
                required
                style={{ display: "block", paddingBottom: "20px" }}
              >
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    clearable
                    value={selectedDate}
                    placeholder="10/10/2018"
                    onChange={(date) => handleDateChange(date)}
                    minDate={new Date()}
                    format="MM/dd/yyyy"
                  />
                </MuiPickersUtilsProvider>
              </FormControl>
              <FormControl
                variant="standard"
                style={{
                  display: "block",
                  paddingBottom: "20px",
                }}
                required
              >
                <InputLabel id="demo-simple-select-standard-label">
                  timeSlots
                </InputLabel>
                {doctor?.id && !!timeSlots.length && (
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    // value={age}
                    style={{
                      width: "200px",
                    }}
                    // onChange={handleChange}
                    label="Time Slot"
                    name="timeSlot"
                  >
                    {timeSlots.length &&
                      timeSlots.map((data) => (
                        <MenuItem value={data}>{data}</MenuItem>
                      ))}
                  </Select>
                )}
                {doctor?.id && !timeSlots.length && (
                  <Typography>No slots available for selected date</Typography>
                )}
              </FormControl>
              <FormControl
                style={{ display: "block", paddingBottom: "20px" }}
                required
              >
                <TextField
                  label="Medical History"
                  name="history"
                  aria-describedby="my-helper-text"
                />
              </FormControl>
              <FormControl
                style={{ display: "block", paddingBottom: "20px" }}
                required
              >
                <TextField
                  label="Symptoms"
                  name="symptoms"
                  aria-describedby="my-helper-text"
                />
              </FormControl>
              <Button
                disabled={doctor?.id && !timeSlots.length}
                variant="contained"
                color="primary"
                type="submit"
              >
                BOOK APPOINTMENT
              </Button>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BookAppointment;
