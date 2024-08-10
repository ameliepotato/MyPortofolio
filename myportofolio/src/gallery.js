import './App.css';
import { useState } from "react";
import { Button, ListItem, ListItemText } from '@mui/material';
import List from '@mui/material/List';

function Gallery(props) {
    const [photos, setPhotos] = useState([{ id: "1", name: "one" }, { id: "2", name: "two" }, { id: "3", name: "three" }]);

    return (
        <div>
            <Button onClick={() => {

            }}>Add new work</Button>
            <List orientation="horizontal">
                {photos.map((photo) => {
                    return (
                        
                            <ListItemText name={photo.name} key={photo.id}> {photo.name}</ListItemText>
                     

                    );
                })}</List>
        </div>);
};
export default Gallery;