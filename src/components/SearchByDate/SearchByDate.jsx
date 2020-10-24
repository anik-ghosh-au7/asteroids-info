import React from "react";
import TextField from "@material-ui/core/TextField";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";

// styles
import useStyles from "./searchByDate.style";
import { Button, Typography } from "@material-ui/core";

const SearchByDate = () => {
  const classes = useStyles();
  return (
    <div className={classes.date_picker}>
      <form className={classes.container} noValidate>
        <TextField
          id="date"
          label="Start Date"
          type="date"
          defaultValue="2020-01-01"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="date"
          label="End Date"
          type="date"
          defaultValue="2020-01-07"
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

export default SearchByDate;
