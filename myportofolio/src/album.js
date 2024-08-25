import { Button, TextField } from '@mui/material';
import './App.css';
import './album.css';
import { useState } from "react";
import Gallery from './gallery';

function Album(props) {
    const [expanded, setExpanded] = useState(props.expanded);
    const [renaming, setRenaming] = useState(false);
    const [pinned, setPinned] = useState(props.album.pinned ?? false);
    const [publicView, setPublicView] = useState(props.album.publicView);

    return (
        <div id={'DivAlbum' + props.album.id} className={expanded ? 'Div-Border' : ''}>
            {(!expanded) &&
                <div>
                    <Button id={"Pin" + props.album.id} onClick={() => {
                        setExpanded(true);
                    }}>  {props.album.name} {pinned ? "- Pinned" : ""}</Button>
                </div>
            }
            {
                expanded && !renaming &&

                <h1> {props.album.name}  by {props.album.user}    </h1>

            }

            {
                expanded && props.album.user && !renaming &&
                <div>
                    <p>
                        {props.album.desc}
                    </p>

                    <Button onClick={() => {
                        props.pinFn(props.album.id, !pinned);
                        setPinned(!pinned);
                    }}> {pinned ? "Unpin" : "Pin"} </Button>

                    <Button onClick={() => {
                        setPublicView(!publicView);
                    }}> {publicView ? "Make private" : "Make public"} </Button>
                    <Button onClick={() => {
                        setRenaming(true);
                    }}> Rename</Button>
                    <Button onClick={() => props.deleteFn(props.album.id)}> Delete</Button>
                </div>
            }
            {renaming &&
                <TextField variant="outlined" label="album name" defaultValue={props.album.name}> {props.album.name} </TextField >
            }
            {expanded &&
                <div>
                    <Gallery user={props.album.user} name={props.album.name} albumId={props.album.id} />
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
