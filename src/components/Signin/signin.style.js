import { fade, makeStyles } from "@material-ui/core/styles";

const top = 50;
const left = 50;

export const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: fade(theme.palette.common.black, 0.35),
    outline: "none",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: `${top}vh`,
    left: `${left}vw`,
    transform: `translate(-${top}%, -${left}%)`,
    borderRadius: "2%",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: "white",
    "&$disabled": {
      color: "red",
    },
  },
  disabled: {},
  link: {
    cursor: "pointer",
  },
  textFeild: {
    color: fade(theme.palette.common.white, 0.6),
  },
}));
