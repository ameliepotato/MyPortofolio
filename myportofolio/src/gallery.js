import './App.css';
import { useState, useEffect } from "react";
import { Button, ImageList } from '@mui/material';
import appAlbum from './appAlbum';
import Work from './work';
import appPicture from './appPicture';

function Gallery(props) {
    const [photos, setPhotos] = useState([]);

    const handleFileChange = (e) => {
      if (e.target.files) {
        var picture = appPicture.addPicture({
            name: "Jane Doe",
            desc: "my photo",
            album: props.albumId,
            photo: e.target.files[0]
        });
        console.log('Picture added: ' + picture);
        let copy = photos.length > 0 ? [...photos] : [];
        copy.push(picture);
        setPhotos(copy);
      }
    };

    useEffect(() => {
        const fetchPictures = async () => {
            const albumsData = await appAlbum.getGallery(props.user._id);
            if (albumsData) {
                console.log(albumsData);
                setPhotos(albumsData);
            }
        };
        fetchPictures();
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <div id={props.name}>
            {photos.length && <ImageList cols={3}>{
                photos.map((photo) => {
                    return (
                        <Work name={photo.name} key={photo.id} id={photo.id}> {photo.name}</Work>
                    );
                })}

            </ImageList>}
            {props.user &&
                <ImageList>
                    <Button component="label" >
                        Add new work
                        <input onChange={handleFileChange}
                            type="file"
                            hidden
                        />
                    </Button>
                </ImageList>}
        </div >);
};
export default Gallery;