import { Typography } from '@material-ui/core'
import React from 'react'

export default function VoteNumber(props) {

  return (
    <Typography>Total Votes: {props.voteNumber}</Typography>
  )
}