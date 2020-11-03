import React, {useState, useEffect} from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import {makeStyles} from '@material-ui/core/styles'
import { GridListTile, List } from '@material-ui/core'
import VoteButton from './votebutton'
import VoteNumber from './votenumbertally'

const useStyles = makeStyles(() => ({
  details:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  name:{
    fontSize: 20,
    textDecoration: 'underline', 
  },
  votes:{
    fontSize: 18,
  },
  image:{
    height: 300,
    width: 200,
    borderRadius: '50%',
    boxShadow: '0 1px 10px #404040'
  },
  voteContainer:{
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',   
  },
  dogContainer:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
  },

}))

export default function Dogs() {
  const classes = useStyles()
  
  const [dogDetails, setDogDetails] = useState([])
  
    const fetchDetails = async () => {
        await fetch(`http://localhost:5000/dogs/details`)
        .then(res => res.json())
        .then(galleryData => setDogDetails([...galleryData]))
        .catch(error => console.error(error))
    }

  useEffect(() => {
    // updated dogDetails
    fetchDetails()
  }, []);

const voteForDog = async (username, name) => {
  await fetch('http://localhost:5000/dog/username/name/vote', {
  method: 'POST',
  headers: {
    'Accept': 'application/json , text/plain',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: username,
    name: name
    })
  })
  .then(res => res.json()
  .then(res => {
    console.log(`${res}`)
  }))
  fetchDetails()
}

  return(
    <div>
      <h2>The Gallery</h2>
      <Grid container component={Paper}  className={classes.voteContainer}>
        {dogDetails.map(dogDetails =>
          <GridListTile item="true" cols={4} sm={5} md={4} className={classes.dogContainer}>
            <img className={classes.image} src={dogDetails.image} alt={`${dogDetails.username} ${dogDetails.name}`}/>
            <VoteButton username={dogDetails.username} voteForDog = {e => voteForDog(dogDetails.username, dogDetails.name)} />
            <Grid className={classes.details}>
              <List className={classes.name} >{dogDetails.name}</List>
              <List className={classes.breed}>{dogDetails.breed}</List>
              <VoteNumber className={classes.votes}  voteNumber = {dogDetails.votes} />
            </Grid>
          </GridListTile>
          )}
      </Grid>
    </div>
  )
}