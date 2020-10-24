import { createMuiTheme, fade } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#535350",
      main: "#ffffff",
      dark: "#3E3E3C",
      contrastText: "#000",
    },
    secondary: {
      light: "#FFFFFF",
      main: "#000000",
      dark: "#EBEBEB",
      contrastText: "#fff",
    },
    error: {
      main: "#FF0000",
    },
    notification: {
      main: fade("#ffffff", 0.4),
      contrastText: fade("#000000", 0.8),
    },
  },
});

export default theme;
