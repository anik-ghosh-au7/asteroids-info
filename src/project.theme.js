import { createMuiTheme } from "@material-ui/core/styles";

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
  },
});

export default theme;
