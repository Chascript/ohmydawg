import React from 'react';
import { Pets } from '@material-ui/icons';

export default function VoteButton(props) {
  return <Pets onClick={props.voteForDog} />;
}
