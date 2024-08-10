import './App.css';
import { useState } from "react";
import { Button, ImageList, ListItemText } from '@mui/material';

function Gallery(props) {
    const [photos, setPhotos] = useState([{ id: "1", name: "one" }, { id: "2", name: "two" }, { id: "3", name: "three" }, {id:"4", name:"four"}, {id:"5", name:"five"}]);
    return (
        <div>
          
            <ImageList cols={3}>
                {photos.map((photo) => {
                    return (
                        <ListItemText name={photo.name} key={photo.id}> {photo.name}</ListItemText>
                    );
                })}
                  <Button onClick={() => {
            }}>Add new work</Button>
                </ImageList>
        </div>);
};
export default Gallery;