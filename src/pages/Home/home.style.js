import { fade, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  welcome: {
    position: "absolute",
    top: "2%",
    left: "5%",
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
    maxHeight: "70vh",
    width: "40%",
    overflow: "auto",
    backgroundColor: fade(theme.palette.common.black, 0.35),
  },
  inline: {
    display: "inline",
  },
  card: {
    display: "flex",
    width: "100%",
    backgroundColor: fade(theme.palette.common.white, 0.5),
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  content: {
    flex: "1 0 auto",
    width: "90%",
    padding: 0,
    "&:last-child": {
      padding: 5,
      paddingLeft: 15,
    },
  },
  cover: {
    width: 150,
    height: 120,
    border: `1px solid ${theme.palette.common.black}`,
    borderRadius: "5%",
    margin: "2px",
  },
  card_title: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  title_subpart: {
    display: "flex",
    flexDirection: "row",
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
}));

export default useStyles;
