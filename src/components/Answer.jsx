import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const Answer = (props) => {
  return (
    <Button variant="contained">
      {props.content}
    </Button>
  )
}

export default Answer
