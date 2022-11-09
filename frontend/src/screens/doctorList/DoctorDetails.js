import { Modal, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React from "react";

const DoctorDetails = ({ viewDetails, setViewDetails, doctor }) => {
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
        <div style={{ backgroundColor: "#fff", width: "calc(20vw + 20px)", marginLeft:"40vw", marginTop:"100px" }}>
          <div className="modal-header" style={{ width: "20vw" }}>
            Doctor Details
          </div>
          <div style={{ padding: "20px" }}>
            <Typography style={{fontSize: "larger", paddingBottom: "5px"}}>Dr: {doctor?.firstName + " " + doctor?.lastName}</Typography>
            <Typography>Total Experience: {doctor?.totalYearsOfExp}</Typography>
            <Typography>Speciality: {doctor?.speciality}</Typography>
            <Typography>Date of Birth: {doctor?.dob}</Typography>
            <Typography>City: {doctor?.address?.city}</Typography>
            <Typography>Email: {doctor?.emailId}</Typography>
            <Typography>Mobile: {doctor?.mobile}</Typography>
            <Typography>
              Rating: <Rating value={doctor?.rating}/>
            </Typography>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DoctorDetails;
