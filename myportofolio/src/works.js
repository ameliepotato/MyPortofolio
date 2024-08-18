import './App.css';
import { Button } from '@mui/material';
import { useState, useEffect } from "react";
import Album from './album';
import appAlbumLogic from './appAlbumLogic';

function Works(props) {
    const [albums, setAlbums] = useState([]);

    async function deleteAlbum(albumId) {
        try {
            var albumDeleted  = await appAlbumLogic.deleteAlbum(albumId);
            console.log('Album Deleted:', albumDeleted);
            var copy = [];
            albums.forEach(a => {
                if (a._id !== albumId) {
                    copy.push(a);
                }
            });
            setAlbums(copy);
        } catch (error) {
            console.error('Error deleting album:', error.response?.data || error.message);
        }
    }

    function onPin(id, pinned) {
        let copy = [...albums];
        copy.sort((a, b) => {
            if (a._id === id) {
                a.pinned = pinned;
            }
            if (b._id === id) {
                b.pinned = pinned;
            }
            if (a.pinned === b.pinned) {
                if (a._id > b._id) {
                    return -1;
                }
                return 1;
            } else {
                if (a.pinned) {
                    return -1;
                } else {
                    return 1;
                }
            }
        });
        setAlbums(copy);
    }

    useEffect(() => {
        const fetchAlbums = async () => {
            const albumsData = await appAlbumLogic.getAlbums();
            if (albumsData) {
                setAlbums(albumsData);
            }
        };

        fetchAlbums();
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <div id="albums">
            {
            albums.map((album) => {
                if (album.publicView || (props.user && props.user.username === album.user))
                    return (
                        <Album name={album.name} key={album._id}
                            id={album._id} expanded={false} pinned={album.pinned}
                            deleteFn={deleteAlbum} pinFn={onPin} publicView={album.publicView} desc={album.desc} user={album.user}></Album>
                    );
                return "";
            })}
            {props.user &&
                <Button onClick={() => {
                    try {
                        var newAlbum = {
                            name: 'NewAlbum',
                            publicView: false,
                            desc: 'My new album',
                            pinned: false,
                            user: props.user.username
                        };
                        newAlbum._id = appAlbumLogic.createAlbum(newAlbum);
                        console.log('Album Created:', newAlbum);
                        var copy = [...albums];
                        copy.push(newAlbum);
                        setAlbums(copy);
                    } catch (error) {
                        console.error('Error creating album:', error.response?.data || error.message);
                    }
                }}>Add new album</Button>
            }
        </div>
    );
}

export default Works;
