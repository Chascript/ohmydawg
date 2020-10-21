import React from 'react'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'

export default function VoteButton(props) {
  return(
    <ThumbUpAltIcon onClick={props.voteForDog} />
  )
}