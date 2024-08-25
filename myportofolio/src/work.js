import './App.css';
import { useState } from "react";
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

function Work(props) {
    const [open, setOpen] = useState(false);
    const [work, setWork] = useState(props.work);
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div id={"work" + props.id}>
            <Button variant="outlined" onClick={handleClickOpen}>
                {work.name}
            </Button>
            <Dialog onClose={handleClose} open={open} id={"workDialog" + props.id}>
                <DialogTitle>{work.name} details</DialogTitle>
                <Button onClick={() => {  setWork(work.previous); }}>Previous</Button>
                <Button onClick={() => { setWork(work.next);}}>Next</Button>
                <Button variant="outlined" onClick={handleClose}> Close </Button>
            </Dialog>
        </div>
    );
}

export default Work;
