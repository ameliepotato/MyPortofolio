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
            var p = {  name: picture.name, desc: "desc", album: props.albumId , photo: picture };
            appPicture.addPicture(p, (newPic) => {
                console.log('Picture added: ' + newPic);
                let copy = photos.length > 0 ? [...photos] : [];
                copy.push(newPic);
                setPhotos(copy);
                setPicture(null);
            });            
        }
        catch (e) {
            console.log('Error: ' + e);
        }
    };

    const fetchPictures = async () => {
        const albumsData = await appAlbum.getGallery(props.albumId);
        if (albumsData) {
            console.log('Albums: ', albumsData);
            setPhotos(albumsData);
        }
    };
    
    useEffect(() => {
        
        fetchPictures();
    }, [props.albumId]); // Empty dependency array means this effect runs once on mount

    return (
        <div id={props.name}>
            
           { props.user && <div>
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
            </div>}
            {photos.length && <ImageList cols={3}>{
                photos.map((photo) => {
                    return (
                        <Work key={photo.id} work={photo} refreshFn={fetchPictures}> {photo.name} </Work>
                    );
                })}

            </ImageList>}
        </div >);
};
export default Gallery;