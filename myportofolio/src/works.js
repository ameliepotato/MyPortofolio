import './App.css';
import { Button } from '@mui/material';
import { useState, useEffect } from "react";
import Album from './album';
import appAlbum from './appAlbum';

function Works(props) {
    const [albums, setAlbums] = useState([]);

    async function deleteAlbum(albumId) {
        try {
            var albumDeleted = await appAlbum.deleteAlbum(albumId);
            console.log('Album Deleted:', albumDeleted);
            var copy = [];
            albums.forEach(a => {
                if (a.id !== albumId) {
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
            if (a.id === id) {
                a.pinned = pinned;
            }
            if (b.id === id) {
                b.pinned = pinned;
            }
            if (a.pinned === b.pinned) {
                if (a.id > b.id) {
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
            const albumsData = await appAlbum.getAlbums(props.userId);
            if (albumsData) {
                setAlbums(albumsData);
            }
        };

        fetchAlbums();
    }, [props]); // Empty dependency array means this effect runs once on mount

    return (
        <div id="albums">
            {
                albums.map((album) => {
                    if ((album.publicView && !props.userId) || (props.userId === album.user))
                        return (
                            <Album key={album.id} expanded={false} deleteFn={deleteAlbum} pinFn={onPin} userId={props.userId} album={album}></Album>
                        );
                    return "";
                })}
            {props.userId &&
                <Button onClick={async() => {
                    try {
                        var newAlbum = {
                            name: 'NewAlbum',
                            publicView: false,
                            desc: 'My new album',
                            pinned: false,
                            user: props.userId
                        };
                        newAlbum.id = appAlbum.createAlbum(newAlbum);
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
