import { Button, TextField } from '@mui/material';
import './App.css';
import './album.css';
import { useState } from "react";
import Gallery from './gallery';
function Album(props) {
    const [expanded, setExpanded] = useState(props.expanded);
    const [renaming, setRenaming] = useState(false);
    return (
        <div id={props.id} className={expanded ? 'Div-Border' : ''}>
            {(!expanded) &&
                <div>
                    <Button onClick={() => {
                        setExpanded(true);
                    }}> {props.name}</Button>
                </div>
            }
            {
                expanded && !renaming &&
                <h1> {props.name}      </h1>}

            {expanded && !renaming &&
                <Button onClick={() => {
                    setRenaming(true);
                }}> Rename</Button>}
            {renaming &&
                <TextField variant="outlined" label="album name" defaultValue={props.name}> {props.name} </TextField >
            }
            {expanded &&
                <div>
                    <Gallery />
                    <Button onClick={() => {
                        setExpanded(false);
                        setRenaming(false);
                    }}> Save & Close </Button>
                </div>
            }
        </div>
    );
}

export default Album;
