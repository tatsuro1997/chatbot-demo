import Button from '@mui/material/Button';
// import { createStyles, makeStyles } from '@mui/styles';

import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => (
  createStyles({
    "button": {
      borderColor: '#4169e1',
      color: '#4169e1',
      fontWeight: 600,
      marginBottom: '8px',
      backgroundColor: '#fff',
      "&:hover": {
        backgroundColor: '#4169e1',
        color: '#fff'
      }
    }
  })
))

const Answer = (props) => {
  const classes = useStyles()

  return (
    <Button className={classes.button} variant="outlined" onClick={() => props.select(props.content, props.nextId)}>
      {props.content}
    </Button>
  )
}

export default Answer
