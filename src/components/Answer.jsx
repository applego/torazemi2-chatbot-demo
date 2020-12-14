import React from 'react';
// https://material-ui.com/components/buttons/#contained-buttons (参照)
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
  },
}));


const Answer = (props) => {
  // const classes = useStyles();
  return (
    <div>
      <Button variant="contained" color="primary" onClick={()=>props.select(props.content, props.nextId)}>
        {props.content}
      </Button>
    </div>
  )
}

export default Answer
