import './App.css';
import { useState } from "react";
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

function Work(props) {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div id={"work" + props.id}>
            <Button variant="outlined" onClick={handleClickOpen}>
                {props.name}
            </Button>
            <Dialog onClose={handleClose} open={open} id={"workDialog" + props.id}>
                <DialogTitle>{props.name} details</DialogTitle>
                <Button onClick={() => { }}>Previous</Button>
                <Button onClick={() => { }}>Next</Button>
                <Button variant="outlined" onClick={handleClose}> Close </Button>
            </Dialog>
        </div>
    );
}

export default Work;
