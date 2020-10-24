import { fade, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  date_picker: {
    backgroundColor: fade(theme.palette.common.white, 0.5),
    position: "absolute",
    top: "35%",
    right: "5%",
    maxWidth: 240,
    borderRadius: "2%",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    padding: 10,
  },
  button: {
    paddingRight: "15px",
    marginLeft: "auto",
    marginBottom: theme.spacing(2),
    marginRight: "18px",
    marginTop: theme.spacing(1),
  },
}));

export default useStyles;
