import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
} from '@material-ui/core';
import { Spring } from 'react-spring/renderprops';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import React from 'react';

export default function PersonalityCheckBoxes(props) {
  return (
    <Spring
      from={{ opacity: 0, marginTop: -250 }}
      to={{ opacity: 1, marginTop: 0 }}
      config={{ delay: 500 }}
    >
      {(transition) => (
        <Grid item style={transition}>
          <FormControl required>
            <FormLabel component="legend">Your Personality! (Can Pick Multiple!)</FormLabel>
            <FormControlLabel
              control={
                <Checkbox
                  icon={<FavoriteBorder color="secondary" />}
                  onChange={props.checkboxChange}
                  checkedIcon={<Favorite />}
                  name="intelligent"
                />
              }
              label="Intelligent"
            />
            <FormControlLabel
              control={
                <Checkbox
                  icon={<FavoriteBorder />}
                  onChange={props.checkboxChange}
                  checkedIcon={<Favorite />}
                  name="loving"
                />
              }
              label="Loving"
            />
            <FormControlLabel
              control={
                <Checkbox
                  icon={<FavoriteBorder />}
                  onChange={props.checkboxChange}
                  checkedIcon={<Favorite />}
                  name="adventurous"
                />
              }
              label="Adventurous"
            />
            <FormControlLabel
              control={
                <Checkbox
                  icon={<FavoriteBorder />}
                  onChange={props.checkboxChange}
                  checkedIcon={<Favorite />}
                  name="social"
                />
              }
              label="Social"
            />
            <FormControlLabel
              control={
                <Checkbox
                  icon={<FavoriteBorder />}
                  onChange={props.checkboxChange}
                  checkedIcon={<Favorite />}
                  name="playful"
                />
              }
              label="Playful"
            />
          </FormControl>
          {props.error && (
            <FormHelperText error> Please Pick At Least 1 Personality </FormHelperText>
          )}
        </Grid>
      )}
    </Spring>
  );
}
