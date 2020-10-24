import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import axios from "axios";
import { map } from "lodash";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import StarsOutlinedIcon from "@material-ui/icons/StarsOutlined";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";

import { List, ListItem, Paper, Typography, Button } from "@material-ui/core";
import SearchBar from "material-ui-search-bar";

import app from "../../config/fire";
import { AuthContext } from "../../utils/auth";
import { favorites } from "../../config/webURL";
import { SET_NOTIFICATION } from "../../redux/actions/notification.action";

// style
import useStyles from "./home.style";

// components
import CardItem from "../../components/CardItem/CardItem";
import SearchByDate from "../../components/SearchByDate/SearchByDate";

const Home = ({ history, setNotification }) => {
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);

  // state variables
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [back, setback] = useState(false);

  // fetch handler
  const fetchData = useCallback(async () => {
    let response = await axios.get(
      `https://api.nasa.gov/neo/rest/v1/neo/sentry?is_active=true&page=0&size=10&api_key=${process.env.REACT_APP_NASA_API_KEY}`
    );
    console.log("data ==>>>> ", response);
    setData(response.data.sentry_objects);
    setback(false);
  }, []);

  // search handler
  const searchHandler = async () => {
    try {
      let response = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/neo/sentry/${search}?api_key=${process.env.REACT_APP_NASA_API_KEY}`
      );
      console.log("data ==>>>> ", response);
      setData([response.data]);
      setNotification({
        open: true,
        severity: "success",
        msg: "Search Successful",
      });
      setback(true);
    } catch (err) {
      if (err.message === "Request failed with status code 404") {
        setNotification({
          open: true,
          severity: "error",
          msg: "id didn't match",
        });
      } else {
        setNotification({
          open: true,
          severity: "error",
          msg: err.message,
        });
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <Fragment>
      <div className={classes.welcome}>
        <h3>Welcome, {currentUser.displayName.toUpperCase()}</h3>
      </div>
      <div className={classes.search_bar}>
        <SearchBar
          onChange={(value) => setSearch(value)}
          onRequestSearch={searchHandler}
          className={classes.search}
          placeholder="Search by Id"
        />
      </div>
      <SearchByDate />
      <div className={classes.wrapper}>
        <Paper className={classes.paper}>
          <List>
            {map(data, (item, idx) => (
              <ListItem alignItems="flex-start" key={idx}>
                <CardItem
                  fullname={item.fullname.replace("(", "").replace(")", "")}
                  sentryId={item.sentryId}
                  is_active_sentry_object={item.is_active_sentry_object.toString()}
                  absolute_magnitude={item.absolute_magnitude}
                  estimated_diameter={item.estimated_diameter}
                  torino_scale={item.torino_scale}
                  palermo_scale_ave={item.palermo_scale_ave}
                  potential_impacts={item.potential_impacts}
                  average_lunar_distance={item.average_lunar_distance
                    .toString()
                    .slice(0, 5)}
                  v_infinity={item.v_infinity.toString().slice(0, 5)}
                  favorite={false}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
        {back && (
          <div className={classes.back_div}>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={fetchData}
            >
              <ArrowBackOutlinedIcon style={{ marginRight: "10px" }} />{" "}
              <Typography color="inherit" style={{ marginTop: "2px" }}>
                Back
              </Typography>
            </Button>
          </div>
        )}
        <div className={classes.signout_div}>
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={() => app.auth().signOut()}
          >
            <ExitToAppIcon style={{ marginRight: "10px" }} />{" "}
            <Typography color="inherit" style={{ marginTop: "2px" }}>
              Signout
            </Typography>
          </Button>
        </div>
        <div className={classes.fav_div}>
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={() => {
              history.push(favorites);
            }}
          >
            <StarsOutlinedIcon style={{ marginRight: "10px" }} />{" "}
            <Typography color="inherit" style={{ marginTop: "2px" }}>
              Favorites
            </Typography>
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

const mapActionToProps = (dispatch) => {
  return {
    setNotification: (data) => {
      dispatch({
        type: SET_NOTIFICATION,
        payload: { ...data },
      });
    },
  };
};

// export component
export default connect(null, mapActionToProps)(withRouter(Home));
