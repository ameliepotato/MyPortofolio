import './App.css';
import { Button } from '@mui/material';
import { useState } from "react";
import Album from './album';

function Works() {
    const [albums, setAlbums] = useState([{ id: "2", name: "two", pinned: true }, { id: "1", name: "one", pinned: false }, { id: "3", name: "three", pinned: false }]);
    function deleteAlbum(id) {
        let copy = [];
        albums.forEach(a => {
            if (a.id !== id) {
                copy.push(a);
            }
        });
        setAlbums(copy);
    }
    function onPin(id, pinned){
        let copy = [...albums];
        copy.sort((a, b) => {
            if(a.id === id){
                a.pinned = pinned;
            }
            if (b.id=== id){
                b.pinned = pinned;
            }
            if (a.pinned === b.pinned) {
                    return a.id.localeCompare(b.id);
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
                return (
                    <Album name={album.name} key={album.id} id={album.id} expanded={false} pinned={album.pinned} deleteFn={deleteAlbum} pinFn={onPin}></Album>
                );
            })}
            <Button onClick={() => {
                let copy = [...albums];
                copy.push({ id: (albums.length + 1).toString(), name: "New Album", pinned: false });
                setAlbums(copy);
            }}>Add new album</Button>

        </div>
    );
}

export default Works;
