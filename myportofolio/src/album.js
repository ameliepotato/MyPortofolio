import { Button, TextField } from '@mui/material';
import './App.css';
import './album.css';
import { useState } from "react";
import Gallery from './gallery';
function Album(props) {
    const [expanded, setExpanded] = useState(props.expanded);
    const [renaming, setRenaming] = useState(false);
    const [pinned, setPinned] = useState(props.pinned ?? false);
    return (
        <div id={props.id} className={expanded ? 'Div-Border' : ''}>
            {(!expanded) &&
                <div>
                    <Button onClick={() => {
                        setExpanded(true);
                    }}>  {props.name} {pinned ? "- Pinned" : ""}</Button>
                </div>
            }
            {
                expanded && !renaming &&
                <div>   <h1> {props.name}      </h1>
                    <Button onClick={() => {
                        props.pinFn(props.id, !pinned);
                        setPinned(!pinned);
                    }}> {pinned ? "Unpin" : "Pin"} </Button>

                    <Button onClick={() => {
                        setRenaming(true);
                    }}> Rename</Button>

                <Button onClick={() => props.deleteFn(props.id) }> Delete</Button>
                </div>}
            {renaming &&
                <TextField variant="outlined" label="album name" defaultValue={props.name}> {props.name} </TextField >
            }
            {expanded &&
                <div>
                    <Gallery />
                    <Button onClick={() => {
                        setExpanded(false);
                        setRenaming(false);
                    }}> Close </Button>
                </div>
            }
        </div>
    );
}

export default Album;
