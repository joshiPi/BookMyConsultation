import React, { useState } from "react";
import DoctorCard from "../../common/doctorCard/DoctorCard";
import BookAppointment from "./BookAppointment";
import DoctorDetails from "./DoctorDetails";

function DoctorList({ doctors }) {
  const [viewDetails, setViewDetails] = useState(false)
  const [viewAppointment, setViewAppointment] = useState(false)
  const [currentDoctor, setCurrentDoctor] = useState(doctors[0])
  return (
    <>
      <DoctorDetails viewDetails={viewDetails} setViewDetails={setViewDetails} doctor={currentDoctor}/>
      <BookAppointment viewDetails={viewAppointment} setViewDetails={setViewAppointment} doctor={currentDoctor}/>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {doctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            name={doctor?.firstName + " " + doctor?.lastName}
            speciality={doctor.speciality}
            rating={doctor.rating}
            viewDetails={setViewDetails}
            setCurrentDoctor={setCurrentDoctor}
            doctor={doctor}
            viewAppointment={setViewAppointment}
          />
        ))}
      </div>
    </>
  );
}

export default DoctorList;
