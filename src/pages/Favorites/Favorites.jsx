import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { map } from "lodash";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import { List, ListItem, Paper, Typography, Button } from "@material-ui/core";

import { AuthContext } from "../../utils/auth";
import { home } from "../../config/webURL";
import { SET_NOTIFICATION } from "../../redux/actions/notification.action";
import firebase from "firebase";

// style
import useStyles from "./favorites.style";

// config
import app from "../../config/fire";

// components
import CardItem from "../../components/CardItem/CardItem";

const Favorites = ({ history, setNotification }) => {
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);

  // state variables
  const [data, setData] = useState([]);
  const [favoritesArr, setFavoritesArr] = useState([]);

  // fetch favorites handler
  const fetchFavorites = useCallback((uid) => {
    let query = app.firestore().collection("users").where("id", "==", `${uid}`);

    query.onSnapshot(async (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setData(Object.values(items[0].favorites));
      setFavoritesArr(Object.keys(items[0].favorites));
    });
  }, []);

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
        msg: `${id} removed favorites`,
      });
    }
  };

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
          {data.length < 1 && (
            <div className={classes.empty_list}>
              <Typography color="primary" style={{ marginTop: "2px" }}>
                List is empty..
              </Typography>
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
              history.push(home);
            }}
          >
            <HomeOutlinedIcon style={{ marginRight: "10px" }} />{" "}
            <Typography color="inherit" style={{ marginTop: "2px" }}>
              Home
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
export default connect(null, mapActionToProps)(withRouter(Favorites));
