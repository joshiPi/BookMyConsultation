import {
  Button,
  Tabs,
  Tab,
} from "@material-ui/core";
import React, { useState } from "react";
import logo from "../../assets/logo.jpeg";
import "./Header.css";
import Modal from "react-modal";
import Register from "../../screens/register/Register";
import Login from "../../screens/login/Login";

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

const Header = ({tab, setTab}) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [userRegistered, setUserRegistered] = useState(false);
  // const [userLoggedIn, setUserLoggedIn] = useState(
  //   !!global.localStorage.getItem("token") || false
  // );

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const loginFormSubmit = async (e) => {
    e.preventDefault();
    const opts = {
      method: "POST",
      headers: {
        authorization: `Basic ${btoa(
          e.target.elements.username.value +
            ":" +
            e.target.elements.password.value
        )}`,
      },
    };
    // try {
    fetch("/auth/login", opts)
      .then((err, data) => {
        if (err) return err.json();
        return data.json();
      })
      .then((data) => {
        if (data?.code === "USR-003") {
          alert("incorrect password");
          return;
        }
        if (data?.code === "USR-002") {
          alert("invalid email");
          return;
        }
        if(data?.code){
          alert("try again")
          return
        }
        global.localStorage.setItem("token", data.accessToken);
        global.localStorage.setItem("userEmail", data.emailAddress);
        setIsOpen(false);
        // setUserLoggedIn(true);
        setTab(1);
      });
  };
  const logout = () => {
    const opts = {
      method: "POST",
      headers: {
        authorization: `Bearer ${global.localStorage.getItem("token")}`,
      },
    };
    fetch("/auth/logout", opts);
    global.localStorage.clear();
    // global.localStorage.removeItem("login");
    // setUserLoggedIn(false);
    setTab(0);
  };
  const registerFormSubmit = (e) => {
    e.preventDefault();
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        emailId: e.target.elements.email.value,
        firstName: e.target.elements.firstName.value,
        lastName: e.target.elements.lastName.value,
        mobile: e.target.elements.contactNo.value,
        password: e.target.elements.password.value,
      }),
    };
    fetch("/users/register", opts)
      .then((data) => data.json())
      .then((data) => {
        if(data?.code === "GEN-001") {
          alert("Invalid Input")
          return
        }
        if(data?.code) {
          alert("please try with valid values")
          return
        }
        console.log(data);
        setUserRegistered(true);
        global.localStorage.setItem("user-registered", true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const Form = () => {
    return (
      <div>
        {tabValue === 0 && (
          <Login loginFormSubmit={loginFormSubmit}/>
        )}
        {tabValue === 1 && (
          <Register userRegistered={userRegistered} registerFormSubmit={registerFormSubmit}/>
        )}
      </div>
    );
  };
  const AuthenticationModal = () => {
    return (
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        title="Authentication"
        contentLabel="Authentication Modal"
        shouldFocusAfterRender={false}
        preventScroll={false}
        ariaHideApp={false}
      >
        <div className="modal-header">Authentication</div>
        <Tabs
          style={{ padding: "0 20px" }}
          value={tabValue}
          onChange={() => setTabValue(tabValue ? 0 : 1)}
        >
          <Tab label="LOGIN" />
          <Tab label="REGISTER" />
        </Tabs>
        <Form />
      </Modal>
    );
  };
  return (
    <>
      <div className="header">
        <div className="header__logo rotate linear infinite">
          <img className="header__logo--image" src={logo} alt="header-logo" />
        </div>
        <AuthenticationModal />
        <div className="header__buttons">
          {global.localStorage.getItem('token') && (
            <Button variant="contained" color="secondary" onClick={logout}>
              LOGOUT
            </Button>
          )}
          {!global.localStorage.getItem('token') && (
            <Button variant="contained" color="primary" onClick={openModal}>
              LOGIN
            </Button>
          )}
        </div>
      </div>
      <Tabs
        variant="fullWidth"
        indicatorColor="primary"
        value={tab}
        onChange={() => setTab(tab ? 0 : 1)}
      >
        <Tab label="DOCTOR" />
        <Tab label="APPOINTMENTS" />
      </Tabs>
    </>
  );
};

export default Header;
