import React from "react";
import { connect } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

// style
import useStyles from "./notification.style";
import { CLEAR_NOTIFICATION } from "../../redux/actions/notification.action";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Notification = (props) => {
  const classes = useStyles();
  const { open, msg, severity, clearNotification } = props;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    clearNotification();
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        className={classes.notification_wrapper}
      >
        <Alert variant="outlined" onClose={handleClose} severity={severity}>
          {msg}
        </Alert>
      </Snackbar>
    </div>
  );
};

const setStateToProps = ({ notification }) => {
  return {
    ...notification,
  };
};

const setActionToProps = (dispatch) => {
  return {
    clearNotification: () => {
      dispatch({
        type: CLEAR_NOTIFICATION,
      });
    },
  };
};

export default connect(setStateToProps, setActionToProps)(Notification);
