import './App.css';
import { Button } from '@mui/material';
import { useState } from "react";
import Album from './album';

function Works(props) {
    const [albums, setAlbums] = useState([{ id: Date.now(), name: "two", pinned: true, publicView: true },
    { id: Date.now() + 10, name: "one", pinned: false, publicView: true },
    { id: Date.now() + 20, name: "three", pinned: false, publicView: false }]);

    function deleteAlbum(id) {
        let copy = [];
        albums.forEach(a => {
            if (a.id !== id) {
                copy.push(a);
            }
        });
        setAlbums(copy);
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

    return (
        <div id="albums">
            {albums.map((album) => {
                if (album.publicView || props.publicView === false)
                    return (
                        <Album name={album.name} key={album.id}
                            id={album.id} expanded={false} pinned={album.pinned}
                            deleteFn={deleteAlbum} pinFn={onPin} publicView={album.publicView} viewOnly={props.publicView}></Album>
                    );
                return <div></div>;
            })}
            {!props.publicView &&
                <Button onClick={() => {
                    let copy = [...albums];
                    copy.push({ id: Date.now(), name: "New Album", pinned: false, publicView: props.publicView });
                    setAlbums(copy);
                }}>Add new album</Button>
            }
        </div>
    );
}

export default Works;
