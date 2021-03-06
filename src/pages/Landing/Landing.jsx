import React, { Fragment, useState } from "react";
import earth from "../../assests/Earth.svg";
import asteroid1 from "../../assests/asteroid1.png";
import asteroid2 from "../../assests/asteroid2.png";
import { Button, Grid, Typography } from "@material-ui/core";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

// style
import "./landing.css";

// components
import Signin from "../../components/Signin/Signin";
import Signup from "../../components/Signup/Signup";
const Landing = () => {
  const [signin, setSignin] = useState(false);
  const [signup, setSignup] = useState(false);

  // handlers
  const signinOpenHandler = () => {
    setSignin(true);
  };
  const signinClosehandler = () => {
    setSignin(false);
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
      <Grid container style={{ marginTop: "40px" }}>
        <Grid item xs></Grid>
        <Grid item xs>
          <Button
            type="button"
            width="50%"
            variant="outlined"
            color="inherit"
            style={{
              marginLeft: "5%",
              paddingRight: "15px",
            }}
            onClick={signinOpenHandler}
          >
            <VpnKeyIcon style={{ marginRight: "10px" }} />{" "}
            <Typography color="inherit" style={{ marginTop: "2px" }}>
              Signin
            </Typography>
          </Button>
        </Grid>
        <Grid item xs>
          <Button
            type="button"
            width="50%"
            variant="outlined"
            color="inherit"
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
      <Signin open={signin} signinClosehandler={signinClosehandler} />
      <Signup open={signup} signupClosehandler={signupClosehandler} />
    </Fragment>
  );
};

export default Landing;
