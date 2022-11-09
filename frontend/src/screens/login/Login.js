import React from 'react'
import { FormControl, Input, InputLabel, Button } from '@material-ui/core'


const Login = ({loginFormSubmit}) => {
  return (
    <form className="login-form" onSubmit={(e) => loginFormSubmit(e)}>
    <FormControl
      required
      style={{
        display: "block",
        paddingBottom: "20px",
        marginTop: "20px",
      }}
    >
      <InputLabel htmlFor="my-input">Username</InputLabel>
      <Input id="input-required" name="username" key="my-input-1" />
    </FormControl>
    <FormControl
      style={{ display: "block", paddingBottom: "40px" }}
      required
    >
      <InputLabel htmlFor="my-input">Password</InputLabel>
      <Input name="password" />
    </FormControl>
    <Button variant="contained" color="primary" type="submit">
      LOGIN
    </Button>
  </form>
  )
}

export default Login