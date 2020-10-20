import React, { Fragment, useState } from "react";
import earth from "../assests/Earth.svg";
import asteroid1 from "../assests/asteroid1.png";
import asteroid2 from "../assests/asteroid2.png";
import { Button, Grid, Typography } from "@material-ui/core";
import { MuiThemeProvider } from "@material-ui/core/styles";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

// theme
import theme from "../project.theme";

// components
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
const Landing = () => {
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);

  // handlers
  const loginOpenHandler = () => {
    setLogin(true);
  };
  const loginClosehandler = () => {
    setLogin(false);
  };

  const signupOpenHandler = () => {
    setSignup(true);
  };
  const signupClosehandler = () => {
    setSignup(false);
  };

  return (
    <Fragment>
      <img src={earth} className="earth" alt="earth" />
      <div className="asteroid1-1">
        <img src={asteroid1} alt="asteriod1" width="75" height="60" />
      </div>
      <div className="asteroid1-2">
        <img src={asteroid2} alt="asteriod1" width="75" height="50" />
      </div>
      <p>
        Are you scared,
        <br /> thinking when the next asteroid might hit the Earth?
      </p>
      <MuiThemeProvider theme={theme}>
        <Grid container style={{ marginTop: "40px" }}>
          <Grid item xs></Grid>
          <Grid item xs>
            <Button
              type="button"
              width="50%"
              variant="outlined"
              className={""}
              color="inherit"
              style={{
                marginLeft: "5%",
                paddingRight: "15px",
              }}
              onClick={loginOpenHandler}
            >
              <VpnKeyIcon style={{ marginRight: "10px" }} className={""} />{" "}
              <Typography color="inherit" style={{ marginTop: "2px" }}>
                Login
              </Typography>
            </Button>
          </Grid>
          <Grid item xs>
            <Button
              type="button"
              width="50%"
              variant="outlined"
              color="inherit"
              className={""}
              style={{
                marginRight: "15%",
                paddingLeft: "15px",
              }}
              onClick={signupOpenHandler}
            >
              <Typography color="inherit" style={{ marginTop: "2px" }}>
                Signup
              </Typography>{" "}
              <LockOutlinedIcon style={{ marginLeft: "10px" }} className={""} />
            </Button>
          </Grid>
          <Grid item xs></Grid>
        </Grid>
      </MuiThemeProvider>
      <Login open={login} loginClosehandler={loginClosehandler} />
      <Signup open={signup} signupClosehandler={signupClosehandler} />
    </Fragment>
  );
};

export default Landing;
