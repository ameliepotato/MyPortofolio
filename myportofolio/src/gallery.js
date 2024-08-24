import './App.css';
import { useState, useEffect } from "react";
import { Button, ImageList } from '@mui/material';
import appAlbum from './appAlbum';
import Work from './work';
import appPicture from './appPicture';


function Gallery(props) {
    const [photos, setPhotos] = useState([]);
    const [picture, setPicture] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files) {
            setPicture(e.target.files[0]);
        }
    };

    const uploadPicture = () => {
        try {
            var p = {  name: picture.name, desc: "desc", album: props.albumid , photo: picture };
            p._id = appPicture.addPicture(p);
            console.log('Picture added: ' + p.name);
            let copy = photos.length > 0 ? [...photos] : [];
            copy.push(p);
            setPhotos(copy);
            setPicture(null);
        }
        catch (e) {
            console.log('Error: ' + e);
        }

    };

    useEffect(() => {
        const fetchPictures = async () => {
            const albumsData = await appAlbum.getGallery(props.albumid);
            if (albumsData) {
                console.log(albumsData);
                setPhotos(albumsData);
            }
        };
        fetchPictures();
    }, [picture]); // Empty dependency array means this effect runs once on mount

    return (
        <div id={props.name}>
            <Button component="label" >
                Add new work
                <input onChange={handleFileChange}
                    type="file"
                    hidden
                />
            </Button>
            {picture && <Button onClick={uploadPicture} >
                Upload {picture.name}
            </Button>}

            {photos.length && <ImageList cols={3}>{
                photos.map((photo) => {
                    return (
                        <Work name={photo.name} key={photo._id} id={photo.id}> {photo.name}</Work>
                    );
                })}

            </ImageList>}
        </div >);
};
export default Gallery;