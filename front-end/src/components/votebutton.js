import React, { useState } from 'react'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'

export default function VoteButton(props) {
  const details = props

  const voteForDog = async () => {
    await fetch('http://localhost:5000/dog/username/name/vote', {
    method: 'POST',
    headers: {
      'Accept': 'application/json , text/plain',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: details.username,
      name: details.name
      })
    })
    .then(responce => responce.json()
    .then(response => {
      console.log(`dog voted ${response}`)
    }))
  }


  return(
    <ThumbUpAltIcon onClick={voteForDog}  />

  )
}