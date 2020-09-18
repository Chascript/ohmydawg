import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded';
import image from '../images/Dog.jpg'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 1000,
    height: 500,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

const tileData = [
  {
    img : image,
    name: 'Manson',
    breed: 'Miniature Poodle',
    votes: 15
  },  {
    img : image,
    name: 'Manson',
    breed: 'Miniature Poodle',
    votes: 15
  },  {
    img : image,
    name: 'Manson',
    breed: 'Miniature Poodle',
    votes: 15
  },  {
    img : image,
    name: 'Manson',
    breed: 'Miniature Poodle',
    votes: 15
  },

]



export default function TitlebarGridList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={450} className={classes.gridList}>
        <GridListTile key="Subheader" cols={4} style={{ height: 'auto' }}>
          <ListSubheader component="div">Voting Page</ListSubheader>
        </GridListTile>
        {tileData.map((tile) => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.name} />
            <GridListTileBar
              title={tile.name}
              subtitle={<span>{tile.breed}</span>}
              actionIcon={
                <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
                  {tile.votes}<ThumbUpAltRoundedIcon /> 
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
