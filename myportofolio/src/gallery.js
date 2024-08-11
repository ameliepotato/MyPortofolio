import './App.css';
import { useState } from "react";
import { Button, ImageList } from '@mui/material';
import Work from './work';

function Gallery(props) {
    const [photos, setPhotos] = useState([{ id: "1", name: "one" }, { id: "2", name: "two" }, { id: "3", name: "three" }, { id: "4", name: "four" }, { id: "5", name: "five" }]);
    return (
        <div>

            <ImageList cols={3}>
                {photos.map((photo) => {
                    return (
                        <Work name={photo.name} key={photo.id} id={photo.id}> {photo.name}</Work>
                    );
                })}
                {!props.viewOnly &&
                    <Button onClick={() => {
                    }}>Add new work</Button>
                } </ImageList>
        </div>);
};
export default Gallery;