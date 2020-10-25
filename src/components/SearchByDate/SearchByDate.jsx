import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import moment from "moment";
import { connect } from "react-redux";
import { Button, Typography } from "@material-ui/core";

// styles
import useStyles from "./searchByDate.style";

// reducer actions
import { SET_NOTIFICATION } from "../../redux/actions/notification.action";

const SearchByDate = ({ submitHandler, setNotification }) => {
  const classes = useStyles();

  // state
  const [error, setError] = useState({
    status: false,
    message: "",
  });

  // form submit handler
  const formSubmitHandler = (e) => {
    e.preventDefault();

    let startDate = moment(e.target.startDate.value);
    let endDate = moment(e.target.endDate.value);
    let duration = moment.duration(endDate.diff(startDate));
    let days = duration.asDays();

    // date validations
    if (days > 7) {
      setError({
        status: true,
        message: "Max. seven days are allowed",
      });
    } else if (days < 1) {
      setError({
        status: true,
        message: "End date should be after Start date",
      });
    } else {
      submitHandler(e.target.startDate.value, e.target.endDate.value);
    }
  };

  // error notifications
  useEffect(() => {
    if (error.status) {
      setNotification({
        open: true,
        severity: "error",
        msg: error.message,
      });
    }
  }, [error, setNotification]);

  return (
    <div className={classes.date_picker}>
      <form
        className={classes.container}
        noValidate
        onSubmit={formSubmitHandler}
      >
        <TextField
          id="startDate"
          name="startDate"
          label="Start Date"
          type="date"
          defaultValue="2020-01-01"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="endDate"
          name="endDate"
          label="End Date"
          type="date"
          defaultValue="2020-01-08"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button
          type="submit"
          variant="outlined"
          color="secondary"
          className={classes.button}
        >
          <SearchOutlinedIcon style={{ marginRight: "10px" }} />{" "}
          <Typography color="inherit" style={{ marginTop: "2px" }}>
            Search
          </Typography>
        </Button>
      </form>
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
export default connect(null, mapActionToProps)(SearchByDate);
