import React from "react";
import {
  FormControl,
  Input,
  InputLabel,
  Typography,
  Button,
} from "@material-ui/core";

const Register = ({ registerFormSubmit, userRegistered }) => {
  return (
    <form className="login-form" onSubmit={(e) => registerFormSubmit(e)}>
      <FormControl style={{ display: "block", paddingBottom: "20px" }} required>
        <InputLabel htmlFor="my-input">First Name</InputLabel>
        <Input name="firstName" aria-describedby="my-helper-text" />
      </FormControl>
      <FormControl style={{ display: "block", paddingBottom: "20px" }} required>
        <InputLabel htmlFor="my-input">Last Name</InputLabel>
        <Input name="lastName" aria-describedby="my-helper-text" />
      </FormControl>
      <FormControl style={{ display: "block", paddingBottom: "20px" }} required>
        <InputLabel htmlFor="my-input">Email</InputLabel>
        <Input name="email" type="email" aria-describedby="my-helper-text" />
      </FormControl>
      <FormControl style={{ display: "block", paddingBottom: "20px" }} required>
        <InputLabel htmlFor="my-input">Password</InputLabel>
        <Input name="password" aria-describedby="my-helper-text" />
      </FormControl>
      <FormControl style={{ display: "block", paddingBottom: "40px" }} required>
        <InputLabel htmlFor="my-input">Contact No.</InputLabel>
        <Input
          name="contactNo"
          aria-describedby="my-helper-text"
          pattern="[1-10]{10}"
        />
      </FormControl>
      {userRegistered && (
        <Typography style={{ marginTop: "-20px", marginBottom: "20px" }}>
          Registration successful. Please Login!
        </Typography>
      )}
      <Button variant="contained" color="primary" type="submit">
        REGISTER
      </Button>
    </form>
  );
};

export default Register;
