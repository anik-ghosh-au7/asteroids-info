import { fade, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  welcome: {
    position: "absolute",
    top: "2%",
    left: "5%",
  },
  route: {
    position: "absolute",
    top: "8%",
    right: "5%",
  },
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 0,
    marginBottom: 0,
  },
  paper: {
    position: "absolute",
    top: "12%",
    maxHeight: "78vh",
    width: "45%",
    overflow: "auto",
    backgroundColor: fade(theme.palette.common.black, 0.35),
  },
  inline: {
    display: "inline",
  },
  button: {
    marginLeft: "5%",
    paddingRight: "15px",
  },
  signout_div: {
    position: "absolute",
    bottom: "5%",
    right: "5%",
  },
  fav_div: {
    position: "absolute",
    bottom: "5%",
    left: "5%",
  },
  search_bar: {
    position: "absolute",
    top: "20%",
    right: "5%",
  },
  search: {
    margin: "0",
    maxWidth: 300,
    backgroundColor: fade(theme.palette.common.white, 0.5),
  },
  back_div: {
    float: "right",
    margin: "0 22px 15px 5px",
  },
}));

export default useStyles;
