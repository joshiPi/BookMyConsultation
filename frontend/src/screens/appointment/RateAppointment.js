import {
  Modal,
  Button,
  FormControl,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Rating } from "@material-ui/lab";

const RateAppointment = ({ viewDetails, setViewDetails, currentAppointment }) => {
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
  const rateAppointment = (e) => {
    e.preventDefault();
    if(!e.target.elements.rating.value) {
        alert("please select stars to rate")
        return
    }
    if (!global.localStorage.getItem("token")) {
      alert("Login to book Appointment");
      return;
    }
    const opts = {
      method: "POST",
      headers: {
        authorization: `Bearer ${global.localStorage.getItem("token")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        appointmentId: currentAppointment.appointmentId,
        doctorId: currentAppointment.doctorId,
        rating: e.target.elements.rating.value,
        comments: e.target.elements.comments.value,
      }),
    };
    fetch("/ratings", opts)
      .then((data) => data)
      .then((data) => {
        if (data?.code) {
          alert("Error Please try again");
          return;
        }
        alert("Rating Added");
        setViewDetails(false);
      });
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
            <form
              className="appointment-form"
                onSubmit={(e) => rateAppointment(e)}
            >
              <FormControl
                style={{ display: "block", paddingBottom: "20px" }}
                //   required
              >
                <TextField
                  label="comments"
                  name="comments"
                  aria-describedby="my-helper-text"
                />
              </FormControl>
              <FormControl
                style={{ display: "block", paddingBottom: "20px" }}
                required
              >
                <Typography className="rating">
                  Rating: <Rating name="rating"/>
                </Typography>
              </FormControl>
              <Button variant="contained" color="primary" type="submit">
                RATE APPOINTMENT
              </Button>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RateAppointment;
