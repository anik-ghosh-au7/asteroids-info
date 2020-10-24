import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { withRouter } from "react-router";
import axios from "axios";
import { map } from "lodash";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import StarsOutlinedIcon from "@material-ui/icons/StarsOutlined";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@material-ui/icons/BookmarkOutlined";
import {
  List,
  ListItem,
  Paper,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@material-ui/core";

import app from "../../config/fire";
import { AuthContext } from "../../utils/auth";
import asteroid3 from "../../assests/asteroid3.png";
import { favorites } from "../../config/webURL";

// style
import useStyles from "./home.style";

const Home = ({ history }) => {
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);

  const [data, setData] = useState([]);

  const fetchData = useCallback(async (pageNumber = 0) => {
    let response = await axios.get(
      `https://api.nasa.gov/neo/rest/v1/neo/sentry?is_active=true&page=${pageNumber}&size=10&api_key=${process.env.REACT_APP_NASA_API_KEY}`
    );
    console.log("data ==>>>> ", response);
    setData(response.data.sentry_objects);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <Fragment>
      <div className={classes.welcome}>
        <h3>Welcome, {currentUser.displayName.toUpperCase()}</h3>
      </div>
      <div className={classes.wrapper}>
        <Paper className={classes.paper}>
          <List>
            {map(data, (item, idx) => (
              <ListItem alignItems="flex-start" key={idx}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cover}
                    image={asteroid3}
                    title="asteroid"
                  />
                  <div className={classes.details}>
                    <CardContent className={classes.content}>
                      {/* --------------------------------------- */}
                      <div className={classes.card_title}>
                        <div className={classes.title_subpart}>
                          <Typography component="h6" variant="h6">
                            Name:{" "}
                          </Typography>
                          <Typography
                            component="h6"
                            variant="h6"
                            color="textSecondary"
                          >
                            {item.fullname.replace("(", "").replace(")", "")}
                          </Typography>
                        </div>
                        <div className={classes.title_subpart}>
                          <Typography component="h6" variant="h6">
                            Id:{" "}
                          </Typography>
                          <Typography
                            component="h6"
                            variant="h6"
                            color="textSecondary"
                          >
                            {item.sentryId}
                          </Typography>
                        </div>
                      </div>
                      {/* --------------------------------------- */}
                      <div className={classes.card_title}>
                        <div className={classes.title_subpart}>
                          <Typography variant="subtitle1">Active:</Typography>
                          <Typography variant="subtitle1" color="textSecondary">
                            {item.is_active_sentry_object.toString()}
                          </Typography>
                        </div>
                        <div className={classes.title_subpart}>
                          <Typography variant="subtitle1">
                            Magnitude:
                          </Typography>
                          <Typography variant="subtitle1" color="textSecondary">
                            {item.absolute_magnitude}
                          </Typography>
                        </div>
                        <div className={classes.title_subpart}>
                          <Typography variant="subtitle1">Diameter:</Typography>
                          <Typography variant="subtitle1" color="textSecondary">
                            {item.estimated_diameter}
                          </Typography>
                        </div>
                      </div>
                      {/* --------------------------------------- */}
                      <div className={classes.card_title}>
                        <div className={classes.title_subpart}>
                          <Typography variant="subtitle1">
                            Torino Scale:
                          </Typography>
                          <Typography variant="subtitle1" color="textSecondary">
                            {item.torino_scale}
                          </Typography>
                        </div>
                        <div className={classes.title_subpart}>
                          <Typography variant="subtitle1">
                            Palermo Scale:
                          </Typography>
                          <Typography variant="subtitle1" color="textSecondary">
                            {item.palermo_scale_ave}
                          </Typography>
                        </div>
                        <div className={classes.title_subpart}>
                          <Typography variant="subtitle1">
                            Potential Impacts:
                          </Typography>
                          <Typography variant="subtitle1" color="textSecondary">
                            {item.potential_impacts}
                          </Typography>
                        </div>
                      </div>
                      {/* --------------------------------------- */}
                      <div className={classes.card_title}>
                        <div className={classes.title_subpart}>
                          <Typography variant="subtitle1">
                            Avg. Lunar Distance:
                          </Typography>
                          <Typography variant="subtitle1" color="textSecondary">
                            {item.average_lunar_distance.toString().slice(0, 5)}
                          </Typography>
                        </div>
                        <div className={classes.title_subpart}>
                          <Typography variant="subtitle1">
                            V_Infinity:
                          </Typography>
                          <Typography variant="subtitle1" color="textSecondary">
                            {item.v_infinity.toString().slice(0, 5)}
                          </Typography>
                        </div>
                      </div>
                      {/* --------------------------------------- */}
                    </CardContent>
                  </div>
                  <div className={classes.fav_icon}>
                    {false ? (
                      <BookmarkBorderOutlinedIcon />
                    ) : (
                      <BookmarkOutlinedIcon />
                    )}
                  </div>
                </Card>
              </ListItem>
            ))}
          </List>
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

export default withRouter(Home);
