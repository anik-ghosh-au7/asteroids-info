// packages
import React, { useCallback } from "react";
import Modal from "@material-ui/core/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { withRouter } from "react-router";
import { connect } from "react-redux";

// config
import app from "../../config/fire";

// routes
import { home } from "../../config/webURL";

// redux actions
import { SET_NOTIFICATION } from "../../redux/actions/notification.action";

// styles
import { useStyles } from "./signup.style";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@material-ui/core";

// component
const Signup = ({ open, signupClosehandler, history, setNotification }) => {
  // component style
  const classes = useStyles();

  // project theme
  const theme = useTheme();

  // form fields
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },

    // field validations
    validationSchema: Yup.object({
      firstName: Yup.string()
        .trim()
        .min(2, "Mininum 2 characters")
        .max(10, "Maximum 10 characters")
        .required("Mandatory!!"),
      lastName: Yup.string()
        .trim()
        .min(2, "Mininum 2 characters")
        .max(10, "Maximum 10 characters")
        .required("Mandatory!!"),
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
          .createUserWithEmailAndPassword(
            formik.values.email,
            formik.values.password
          );

        let user = app.auth().currentUser;

        await user.updateProfile({
          displayName: `${formik.values.firstName} ${formik.values.lastName}`,
        });
        setNotification({
          open: true,
          severity: "success",
          msg: "Signup Successful",
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
    [
      history,
      formik.values.email,
      formik.values.firstName,
      formik.values.lastName,
      formik.values.password,
      setNotification,
    ]
  );

  // modal close handler
  const closehandler = () => {
    // clearing feilds & errors
    formik.resetForm();

    // calling signupClosehandler
    signupClosehandler();
  };

  // component body
  const body = (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography color="primary" component="h1" variant="h5">
          <Box fontWeight="fontWeightBold" m={1}>
            Sign Up
          </Box>
        </Typography>
        <form className={classes.form} onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                value={formik.values.firstName}
                InputProps={{
                  className: classes.textField,
                }}
                onChange={onChangeHandle}
                error={formik.errors.firstName && formik.touched.firstName}
                helperText={formik.errors.firstName}
                FormHelperTextProps={{
                  style: { color: theme.palette.error.main },
                }}
                required
                fullWidth
                label="First Name"
                InputLabelProps={{
                  className: classes.textField,
                }}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Last Name"
                InputLabelProps={{
                  className: classes.textField,
                }}
                name="lastName"
                autoComplete="lname"
                value={formik.values.lastName}
                InputProps={{
                  className: classes.textField,
                }}
                onChange={onChangeHandle}
                error={formik.errors.lastName && formik.touched.lastName}
                helperText={formik.errors.lastName}
                FormHelperTextProps={{
                  style: { color: theme.palette.error.main },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Email Address"
                InputLabelProps={{
                  className: classes.textField,
                }}
                name="email"
                autoComplete="email"
                value={formik.values.email}
                InputProps={{
                  className: classes.textField,
                }}
                onChange={onChangeHandle}
                error={formik.errors.email && formik.touched.email}
                helperText={formik.errors.email}
                FormHelperTextProps={{
                  style: { color: theme.palette.error.main },
                }}
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
                  className: classes.textField,
                }}
                type="password"
                value={formik.values.password}
                InputProps={{
                  className: classes.textField,
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
            disabled={
              !!formik.errors.firstName ||
              !!formik.errors.lastName ||
              !!formik.errors.email ||
              !!formik.errors.password
            }
          >
            <Typography color="inherit" style={{ marginTop: "2px" }}>
              Sign Up
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
export default connect(null, mapActionToProps)(withRouter(Signup));
