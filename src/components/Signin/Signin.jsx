// packages
import React, { useCallback } from "react";
import Modal from "@material-ui/core/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { withRouter } from "react-router";
import { connect } from "react-redux";

// config
import app from "../../config/fire";

// redux actions
import { SET_NOTIFICATION } from "../../redux/actions/notification.action";

// routes
import { home } from "../../config/webURL";

// styles
import { useStyles } from "./signin.style";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  fade,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@material-ui/core";

// component
const Signin = ({ open, signinClosehandler, history, setNotification }) => {
  // component style
  const classes = useStyles();

  // project theme
  const theme = useTheme();

  // form fields
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    // fields validation
    validationSchema: Yup.object({
      email: Yup.string()
        .trim()
        .email("Invalid email format")
        .required("Mandatory!!"),
      password: Yup.string()
        .trim()
        .min(6, "Minimum 6 characters")
        .max(20, "Maximum 20 characters")
        .matches(
          /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/,
          "Atleast one each of number, upper case, lower case & special characters should be present"
        )
        .required("Mandatory!!"),
    }),
  });

  // input data handler
  const onChangeHandle = (e) => {
    formik.setFieldTouched(e.target.id);
    return formik.handleChange(e);
  };

  // form submit handler
  const submitHandler = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(
            formik.values.email,
            formik.values.password
          );
        setNotification({
          open: true,
          severity: "success",
          msg: "Signin Successful",
        });
        history.push(home);
      } catch (err) {
        setNotification({
          open: true,
          severity: "error",
          msg: err.message,
        });
      }
    },
    [history, formik.values.email, formik.values.password, setNotification]
  );

  // clearing feilds & errors
  const closehandler = () => {
    formik.resetForm();
    signinClosehandler();
  };

  // component body
  const body = (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography color="primary" component="h1" variant="h5">
          <Box fontWeight="fontWeightBold" m={1}>
            Signin
          </Box>
        </Typography>
        <form className={classes.form} onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Email Address"
                InputLabelProps={{
                  style: { color: fade(theme.palette.common.white, 0.6) },
                }}
                name="email"
                autoComplete="email"
                value={formik.values.email}
                InputProps={{
                  style: { color: fade(theme.palette.common.white, 0.6) },
                }}
                onChange={onChangeHandle}
                error={formik.errors.email && formik.touched.email}
                helperText={formik.errors.email}
                FormHelperTextProps={{
                  style: { color: theme.palette.error.main },
                }}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                InputLabelProps={{
                  style: { color: fade(theme.palette.common.white, 0.6) },
                }}
                type="password"
                value={formik.values.password}
                InputProps={{
                  style: { color: fade(theme.palette.common.white, 0.6) },
                }}
                onChange={onChangeHandle}
                error={formik.errors.password && formik.touched.password}
                helperText={formik.errors.password}
                FormHelperTextProps={{
                  style: { color: theme.palette.error.main },
                }}
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            color="primary"
            classes={{
              root: classes.submit,
              disabled: classes.disabled,
            }}
            disabled={!!formik.errors.email || !!formik.errors.password}
          >
            <Typography color="inherit" style={{ marginTop: "2px" }}>
              Signin
            </Typography>
          </Button>
        </form>
      </div>
    </Container>
  );

  // modal
  return (
    <div>
      <Modal open={open} onClose={closehandler}>
        {body}
      </Modal>
    </div>
  );
};

const mapActionToProps = (dispatch) => {
  return {
    setNotification: (data) => {
      dispatch({
        type: SET_NOTIFICATION,
        payload: { ...data },
      });
    },
  };
};

// export component
export default connect(null, mapActionToProps)(withRouter(Signin));
