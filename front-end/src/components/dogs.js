import React, {useState, useEffect} from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import {makeStyles} from '@material-ui/core/styles'
import { GridListTile, Typography } from '@material-ui/core'
import VoteButton from './votebutton'
import VoteNumber from './votenumbertally'
import { Spring } from 'react-spring/renderprops'

const useStyles = makeStyles(() => ({

  header:{
    display: 'flex',
    alignSelf: 'center',
  },
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
    
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
  },

}))

export default function Dogs() {
  const classes = useStyles()
  
  const [dogDetails, setDogDetails] = useState([])
  const [dogsVoted, setDogsVoted] = useState()

  useEffect(() => {
    if(JSON.parse(localStorage.getItem('dogsVoted')) == null){
      localStorage.setItem('dogsVoted', JSON.stringify([]))
    } 
    const previousDogsVoted = JSON.parse(localStorage.getItem('dogsVoted'))
    setDogsVoted(previousDogsVoted)
   } ,[dogDetails]);

    const fetchDetails = async () => {
        await fetch(`http://localhost:5000/api/dogs/details`)
        .then(res => res.json())
        .then(galleryData => setDogDetails([...galleryData]))
        .catch(error => console.error(error))
    }

  useEffect(() => {
    // updated dogDetails
    fetchDetails()
  }, []);

const voteForDog = async (username, name, id) => {
  if(dogsVoted.includes(id)){
    console.log('id exists')
  } else{
    await fetch(`http://localhost:5000/api/dog/username/name/vote`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json , text/plain',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      dogName: name,
      id: id
      })
    })
    .then(res => res.json()
    .then(res => {
      console.log(`${res}`)
      setDogsVoted(dogsVoted.push(id))
    }))
    fetchDetails()
    localStorage.setItem('dogsVoted', JSON.stringify(dogsVoted))
    }
}

  return(
    <Spring 
    from = {{ opacity: 0, marginTop: -16 }}
    to = {{ opacity:1, marginTop:0 }}
    config = {{ duration:2000 }}
    >
      { transition => ( 
      <Grid container style={transition} component={Paper} justify='center' align='center' direction='column' >
        <Typography component="h1" variant="h3" className={classes.header}>Dog Gallery</Typography>
        <Grid  component={Paper}  className={classes.voteContainer}>
          {dogDetails.map(dogDetails =>
            <GridListTile container ="true" cols={4} sm={5} md={4} className={classes.dogContainer} key={dogDetails.id}>
              <img className={classes.image} src={dogDetails.image} alt={`${dogDetails.username} ${dogDetails.name}`}/>
              <Grid className={classes.details}>
                <Typography className={classes.name} >{dogDetails.dogName}</Typography>
                <Typography className={classes.breed}>{dogDetails.dogBreed}</Typography>
                <VoteNumber className={classes.votes}  voteNumber = {dogDetails.votes} />
                <VoteButton  voteForDog = {() => voteForDog(dogDetails.username, dogDetails.dogName, dogDetails.id)} />
              </Grid>
            </GridListTile>
          )}
        </Grid>
      </Grid>
      )}
    </Spring>
  )
}