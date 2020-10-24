import { fade, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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
}));

export default useStyles;
