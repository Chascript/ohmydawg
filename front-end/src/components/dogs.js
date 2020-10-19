import React, {useState, useEffect} from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import {makeStyles} from '@material-ui/core/styles'
import { GridListTile, List } from '@material-ui/core'
import VoteButton from './votebutton'

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
  const [accounts, setAccounts] = useState([])
  const [buttonClicked, setButtonClicked] = useState(false)


  useEffect(() => {
    const fetchDetails = async () => {
        await fetch('dogs/details')
        .then(res => res.json())
        .then(accounts => setAccounts([...accounts, {accounts}], () => console.log('dogs fetched..',accounts)))
    }

    fetchDetails()
  }, [buttonClicked])


  return(
    <div>
      <h2>The Gallery</h2>
      <Grid container sm={5} md={12} component={Paper}  className={classes.voteContainer}>
        {accounts.map(accounts =>
          <GridListTile item cols={4} sm={5} md={4} className={classes.dogContainer}>
            <img className={classes.image} src={accounts[3]}/>
            <VoteButton name={accounts[0]} username={accounts[4]} onClick={ e => setButtonClicked(!buttonClicked)} />
            <Grid className={classes.details}>
              <List className={classes.name} >{accounts[0]}</List>
              <List  className={classes.breed}>{accounts[1]}</List>
              <List  className={classes.votes}>Total Votes: {accounts[2]}</List>
            </Grid>
          </GridListTile>
          )}
      </Grid>
    </div>
  )
}