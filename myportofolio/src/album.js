import { Button, TextField } from '@mui/material';
import './App.css';
import { useState } from "react";
function Album(props) {
    const [expanded, setExpanded] = useState(props.expanded);
    const [renaming, setRenaming] = useState(false);
    return (
        <div id={props.id}>
            {!expanded &&
                <div>
                    <Button onClick={() => {
                        setExpanded(true);
                    }}> {props.name}</Button>


                </div>

            }
            {expanded && !renaming &&
                <Button onClick={() => {
                    setRenaming(true);
                }}> Rename</Button>
            }
            {expanded &&
                <div>
                    {renaming &&
                        <TextField value={props.name}> </TextField >
                    }
                    {!renaming &&
                        <div>Expanded</div>

                    }



                    <Button onClick={() => {
                        setExpanded(false);
                        setRenaming(false);
                    }}> {props.isNew ? "Save" : "Close"}</Button>
                </div>
            }
        </div>
    );
}

export default Album;
