import React, { useState } from "react";
import { Container, TextField, Button, Typography } from "@material-ui/core";
import axios from "axios";
import { useNavigate } from "react-router";


const SignUp = () => {
  const [newUser, setNewUser] = useState({});
  const history = useNavigate();
  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/create", { user: newUser })
      .then(() => {
        console.log("created");
        alert("Admin Created Successfully");
        history("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container component="main" align="center">
      <form onSubmit={handleSubmit}>
        <Container component="main" align="center" style={{ maxWidth: "35%" }}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <h3 variant="h3">Sign Up</h3>
            <TextField
              label="First Name"
              name="firstName"
              variant="outlined"
              onChange={handleChange}
              required
            ></TextField>
            <TextField
              label="Last Name"
              name="lastName"
              onChange={handleChange}
              variant="outlined"
              required
            ></TextField>
            <TextField
              label="Email"
              name="email"
              type="email"
              onChange={handleChange}
              variant="outlined"
              required
            ></TextField>
            <TextField
              label="UserName"
              name="username"
              onChange={handleChange}
              variant="outlined"
              required
            ></TextField>
            <TextField
              label="Password"
              type="password"
              name="password"
              onChange={handleChange}
              variant="outlined"
              required
            ></TextField>
            <Button variant="contained" type="submit">
              Sign Up
            </Button>
          </div>
        </Container>
      </form>
    </Container>
  );
};

export default SignUp;