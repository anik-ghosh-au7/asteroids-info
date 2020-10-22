import React from "react";
import Modal from "@material-ui/core/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";

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

const Signin = ({ open, signinClosehandler }) => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
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
        email: formik.values.email,
        password: formik.values.password,
      };
      console.log(data);
      //   let response = await httpRequest({
      //     method: "POST",
      //     url: `${homeUrl}api/userslogin`,
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
        <Typography color="primary" component="h1" variant="h5">
          <Box fontWeight="fontWeightBold" m={1}>
            Login
          </Box>
        </Typography>
        <form className={classes.form} onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                InputProps={{
                  classes: {
                    input: classes.textFeild,
                  },
                }}
                FormHelperTextProps={{
                  classes: {
                    root: classes.textFeild,
                  },
                }}
                InputLabelProps={{
                  classes: {
                    root: classes.textFeild,
                  },
                }}
                name="email"
                autoComplete="email"
                value={formik.values.email}
                onChange={onChangeHandle}
                error={formik.errors.email && formik.touched.email}
                helperText={formik.errors.email}
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
                InputProps={{
                  classes: {
                    input: classes.textFeild,
                  },
                }}
                FormHelperTextProps={{
                  classes: {
                    root: classes.textFeild,
                  },
                }}
                InputLabelProps={{
                  classes: {
                    root: classes.textFeild,
                  },
                }}
                type="password"
                id="password"
                value={formik.values.password}
                onChange={onChangeHandle}
                error={formik.errors.password && formik.touched.password}
                helperText={formik.errors.password}
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
              Login
            </Typography>
          </Button>
        </form>
      </div>
    </Container>
  );

  return (
    <div>
      <Modal open={open} onClose={signinClosehandler}>
        {body}
      </Modal>
    </div>
  );
};

export default Signin;
