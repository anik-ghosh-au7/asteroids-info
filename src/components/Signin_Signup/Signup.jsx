import React from "react";
import Modal from "@material-ui/core/Modal";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { useFormik } from "formik";
import * as Yup from "yup";

// theme
import theme from "../../project.theme";

// styles
import useStyles from "./style";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";

const Signup = ({ open, signupClosehandler }) => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },

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
        .min(4, "Minimum 4 characters")
        .max(20, "Maximum 20 characters")
        .matches(
          /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{4,20}$/,
          "Atleast one each of number, upper case, lower case & special characters should be present"
        )
        .required("Mandatory!!"),
    }),
  });

  // input data handle
  const onChangeHandle = (e) => {
    formik.setFieldTouched(e.target.id);
    return formik.handleChange(e);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let data = {
        firstName: formik.values.firstName,
        lastName: formik.values.lastName,
        email: formik.values.email,
        password: formik.values.password,
      };
      console.log(data);
      //   let response = await httpRequest({
      //     method: "POST",
      //     url: `${homeUrl}api/users/signup`,
      //     data,
      //   });
    } catch (err) {
      console.log(err);
    }
  };

  const body = (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <MuiThemeProvider theme={theme}>
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
                    className: classes.textFeild,
                  }}
                  onChange={onChangeHandle}
                  error={formik.errors.firstName && formik.touched.firstName}
                  helperText={formik.errors.firstName}
                  FormHelperTextProps={{
                    className: classes.textFeild,
                  }}
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  InputLabelProps={{
                    className: classes.textFeild,
                  }}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  InputLabelProps={{
                    className: classes.textFeild,
                  }}
                  name="lastName"
                  autoComplete="lname"
                  value={formik.values.lastName}
                  InputProps={{
                    className: classes.textFeild,
                  }}
                  onChange={onChangeHandle}
                  error={formik.errors.lastName && formik.touched.lastName}
                  helperText={formik.errors.lastName}
                  FormHelperTextProps={{
                    className: classes.textFeild,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  InputLabelProps={{
                    className: classes.textFeild,
                  }}
                  name="email"
                  autoComplete="email"
                  value={formik.values.email}
                  InputProps={{
                    className: classes.textFeild,
                  }}
                  onChange={onChangeHandle}
                  error={formik.errors.email && formik.touched.email}
                  helperText={formik.errors.email}
                  FormHelperTextProps={{
                    className: classes.textFeild,
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
                    className: classes.textFeild,
                  }}
                  type="password"
                  id="password"
                  value={formik.values.password}
                  InputProps={{
                    className: classes.textFeild,
                  }}
                  onChange={onChangeHandle}
                  error={formik.errors.password && formik.touched.password}
                  helperText={formik.errors.password}
                  FormHelperTextProps={{
                    className: classes.textFeild,
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
              className={classes.submit}
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
        </MuiThemeProvider>
      </div>
    </Container>
  );

  return (
    <div>
      <Modal open={open} onClose={signupClosehandler}>
        {body}
      </Modal>
    </div>
  );
};

export default Signup;
