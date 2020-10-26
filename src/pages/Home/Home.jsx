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
import { AuthContext } from "../../utils/auth";
import { favorites } from "../../config/webURL";
import { SET_NOTIFICATION } from "../../redux/actions/notification.action";
import firebase from "firebase";

// style
import useStyles from "./home.style";

// config
import app from "../../config/fire";

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
  const [favoritesArr, setFavoritesArr] = useState([]);

  // fetch asteroids handler
  const fetchData = useCallback(async () => {
    let response = await axios.get(
      `https://api.nasa.gov/neo/rest/v1/neo/sentry?is_active=true&page=0&size=10&api_key=${process.env.REACT_APP_NASA_API_KEY}`
    );
    setData(response.data.sentry_objects);
    setback(false);
  }, []);

  // fetch favorites handler
  const fetchFavorites = useCallback((uid) => {
    let query = app.firestore().collection("users").where("id", "==", `${uid}`);

    query.onSnapshot(async (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setFavoritesArr(Object.keys(items[0].favorites));
    });
  }, []);

  // search handler
  const searchHandler = async () => {
    try {
      let response = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/neo/sentry/${search}?api_key=${process.env.REACT_APP_NASA_API_KEY}`
      );
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

  // sort and extract search by date data
  const sortAndExtract = (obj) => {
    let keys = Object.keys(obj);
    let result = [];

    for (var i = keys.length - 1; i >= 0; i--) {
      if (result.length <= 10) {
        result = result.concat(obj[keys[i]].slice(0, 10 - result.length));
      } else {
        break;
      }
    }

    return result;
  };

  // check favorites
  const checkFavorites = (id) => {
    let found = favoritesArr.findIndex((fav_id) => fav_id === id);
    if (found === -1) return false;
    return true;
  };

  // add or remove favorites
  const addOrRemoveFavorites = async (id, idx) => {
    let index = favoritesArr.indexOf(id);
    if (index === -1) {
      setFavoritesArr([...favoritesArr, id]);
      let dataUpdate = {};
      dataUpdate[`favorites.${id}`] = data[idx];
      await app
        .firestore()
        .collection("users")
        .doc(currentUser.uid)
        .update(dataUpdate);
      setNotification({
        open: true,
        severity: "success",
        msg: `${id} added to favorites`,
      });
    } else {
      let newArr = [...favoritesArr];
      newArr.splice(index, 1);
      setFavoritesArr(newArr);
      await app
        .firestore()
        .collection("users")
        .doc(currentUser.uid)
        .set(
          {
            favorites: {
              [id]: firebase.firestore.FieldValue.delete(),
            },
          },
          { merge: true }
        );
      setNotification({
        open: true,
        severity: "warning",
        msg: `${id} removed from favorites`,
      });
    }
  };

  // form handler (serach by date)
  const submitHandler = async (startDate, endDate) => {
    try {
      let response = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&detailed=true&api_key=${process.env.REACT_APP_NASA_API_KEY}`
      );
      let data_arr = sortAndExtract(response.data.near_earth_objects);
      setData(data_arr);
      setNotification({
        open: true,
        severity: "success",
        msg: "Search Successful",
      });
      setback(true);
    } catch (err) {
      setNotification({
        open: true,
        severity: "error",
        msg: "Error occured, please try later",
      });
    }
  };

  // fetch asteroids data hook
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // fetch favorites hook
  useEffect(() => {
    fetchFavorites(currentUser.uid);
  }, [fetchFavorites, currentUser.uid]);

  return (
    <Fragment>
      <div className={classes.welcome}>
        <h3>Welcome, {currentUser.displayName.toUpperCase()}</h3>
      </div>
      <div className={classes.route}>
        <h3>..{history.location.pathname}</h3>
      </div>
      <div className={classes.search_bar}>
        <SearchBar
          onChange={(value) => setSearch(value)}
          onRequestSearch={searchHandler}
          className={classes.search}
          placeholder="Search by Id"
        />
      </div>
      <SearchByDate submitHandler={submitHandler} />
      <div className={classes.wrapper}>
        <Paper className={classes.paper}>
          <List>
            {map(data, (item, idx) => (
              <ListItem alignItems="flex-start" key={idx}>
                <CardItem
                  fullname={(item.fullname || item.name)
                    .replace("(", "")
                    .replace(")", "")}
                  sentryId={item.sentryId || item.id}
                  is_active_sentry_object={(
                    item.is_active_sentry_object || item.is_sentry_object
                  ).toString()}
                  absolute_magnitude={
                    item.absolute_magnitude || item.absolute_magnitude_h
                  }
                  estimated_diameter={
                    item.estimated_diameter.miles
                      ? item.estimated_diameter.miles.estimated_diameter_max
                      : item.estimated_diameter
                  }
                  torino_scale={item.torino_scale || ""}
                  palermo_scale_ave={item.palermo_scale_ave || ""}
                  potential_impacts={item.potential_impacts || ""}
                  average_lunar_distance={
                    item.average_lunar_distance
                      ? item.average_lunar_distance.toString().slice(0, 5)
                      : ""
                  }
                  v_infinity={
                    item.v_infinity
                      ? item.v_infinity.toString().slice(0, 5)
                      : ""
                  }
                  favorite={checkFavorites(item.sentryId || item.id)}
                  index={idx}
                  addOrRemoveFavorites={addOrRemoveFavorites}
                />
              </ListItem>
            ))}
          </List>
          {back && (
            <div className={classes.back_div}>
              <Button
                type="submit"
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
        </Paper>
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
