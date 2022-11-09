import React, { useState, useEffect } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Typography,
  Button,
  Card,
} from "@material-ui/core";
import Appointment from "../appointment/Appointment";
import DoctorList from "../doctorList/DoctorList";
import RateAppointment from "../appointment/RateAppointment";

function Home({ tab }) {
  const [specialityList, setSpecialityList] = useState("CARDIOLOGIST");
  const [doctors, setDoctors] = useState([]);
  const [speciality, selectSpeciality] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [rateAppointment, setRateAppointment] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState();

  const handleChange = (event) => {
    setSpecialityList(event.target.value);
  };
  useEffect(() => {
    (function () {
      fetch(`/doctors?speciality=${specialityList}`)
        .then((data) => data.json())
        .then((data) => setDoctors(data))
        .catch((err) => console.log(err));
    })();
  }, [specialityList]);
  useEffect(() => {
    (function () {
      fetch("/doctors/speciality")
        .then((data) => data.json())
        .then((data) => selectSpeciality(data))
        .catch((err) => console.log(err));
    })();
  }, []);

  const getAppointments = () => {
    const opts = {
      method: "GET",
      headers: {
        authorization: `Bearer ${global.localStorage.getItem("token")}`,
      },
    };
    fetch(
      `users/${global.localStorage.getItem("userEmail")}/appointments`,
      opts
    )
      .then((data) => data.json())
      .then((data) => setAppointments(data));
  };
  // if(tab===1 && global.localStorage.getItem('token') &&) getAppointments()
  useEffect(() => {
    if (tab === 1 && global.localStorage.getItem("token")) {
      getAppointments();
    }
  }, [tab]);

  return (
    <div>
      {tab === 0 && (
        <div style={{ textAlign: "center", paddingTop: "20px" }}>
          <p>Select Speciality</p>
          <FormControl variant="filled" style={{ width: "200px" }}>
            <Select
              labelId="selectSpeciality"
              id="speciality"
              value={specialityList}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {speciality.map((speciality) => (
                <MenuItem value={speciality}>{speciality}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      )}
      <div>
        {tab === 0 && <DoctorList doctors={doctors} />}
        {tab === 1 && !global.localStorage.getItem("token") && (
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "20px",
              paddingTop: "50px",
            }}
          >
            Login to see your appointments
          </p>
        )}
        {tab === 1 &&
          global.localStorage.getItem("token") &&
          appointments.map((data) => (
            <Appointment
              key={data.appointmentId}
              data={data}
              rateAppointment={setRateAppointment}
              currentAppointment={setCurrentAppointment}
            />
          ))}
        <RateAppointment
          viewDetails={rateAppointment}
          currentAppointment={currentAppointment}
          setViewDetails={setRateAppointment}
        />
      </div>
    </div>
  );
}

export default Home;
