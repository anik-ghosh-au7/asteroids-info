import React from "react";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@material-ui/icons/BookmarkOutlined";
import { Typography, Card, CardMedia, CardContent } from "@material-ui/core";

import asteroid3 from "../../assests/asteroid3.png";

// styles
import useStyles from "./cardItem.style";

const CardItem = ({
  fullname,
  sentryId,
  is_active_sentry_object,
  absolute_magnitude,
  estimated_diameter,
  torino_scale,
  palermo_scale_ave,
  potential_impacts,
  average_lunar_distance,
  v_infinity,
  favorite,
}) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardMedia className={classes.cover} image={asteroid3} title="asteroid" />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          {/* --------------------------------------- */}
          <div className={classes.card_title}>
            <div className={classes.title_subpart}>
              <Typography component="h6" variant="h6">
                Name:{" "}
              </Typography>
              <Typography component="h6" variant="h6" color="textSecondary">
                {fullname}
              </Typography>
            </div>
            <div className={classes.title_subpart}>
              <Typography component="h6" variant="h6">
                Id:{" "}
              </Typography>
              <Typography component="h6" variant="h6" color="textSecondary">
                {sentryId}
              </Typography>
            </div>
          </div>
          {/* --------------------------------------- */}
          <div className={classes.card_title}>
            <div className={classes.title_subpart}>
              <Typography variant="subtitle1">Active:</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {is_active_sentry_object}
              </Typography>
            </div>
            <div className={classes.title_subpart}>
              <Typography variant="subtitle1">Magnitude:</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {absolute_magnitude}
              </Typography>
            </div>
            <div className={classes.title_subpart}>
              <Typography variant="subtitle1">Diameter:</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {estimated_diameter}
              </Typography>
            </div>
          </div>
          {/* --------------------------------------- */}
          <div className={classes.card_title}>
            <div className={classes.title_subpart}>
              <Typography variant="subtitle1">Torino Scale:</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {torino_scale}
              </Typography>
            </div>
            <div className={classes.title_subpart}>
              <Typography variant="subtitle1">Palermo Scale:</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {palermo_scale_ave}
              </Typography>
            </div>
            <div className={classes.title_subpart}>
              <Typography variant="subtitle1">Potential Impacts:</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {potential_impacts}
              </Typography>
            </div>
          </div>
          {/* --------------------------------------- */}
          <div className={classes.card_title}>
            <div className={classes.title_subpart}>
              <Typography variant="subtitle1">Avg. Lunar Distance:</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {average_lunar_distance}
              </Typography>
            </div>
            <div className={classes.title_subpart}>
              <Typography variant="subtitle1">V_Infinity:</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {v_infinity}
              </Typography>
            </div>
          </div>
          {/* --------------------------------------- */}
        </CardContent>
      </div>
      <div>
        {favorite ? <BookmarkOutlinedIcon /> : <BookmarkBorderOutlinedIcon />}
      </div>
    </Card>
  );
};

export default CardItem;
