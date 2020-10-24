import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  notification_wrapper: {
    backgroundColor: theme.palette.notification.main,
  },
}));

export default useStyles;
