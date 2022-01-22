import * as React from 'react';
import TextField from '@mui/material/TextField';

const TextInput = (props) => {
    return (
        <TextField
            fullWidth={true}
            label={props.label}
            margin={"dense"}
            multiline={props.multiline}
            rows={props.rows}
            value={props.value}
            tyep={props.type}
            onChange={props.onChange}
            variant="standard"
        />
    )
}

export default TextInput
