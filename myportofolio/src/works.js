import './App.css';
import { Button } from '@mui/material';
import { useState, useEffect } from "react";
import Album from './album';

function Works() {
    const [albumAdded, setAlbumAdded] = useState(false);
    const [albums, setAlbums] = useState([]);
    useEffect(() => {
        setAlbums( albums.concat([{ id: "1", name: "one"},{ id: "2", name: "two"},{ id:"3", name:"three"}]));
      }, [albums]);
    return (
        <div id="albums">
            {
                albums.forEach(element => {
                    <Album id={element.id} name={element.name} expanded={false}></Album>
                })
            }
            {
                albumAdded &&
                <Album id="newAlbum" name="newAlbum" expanded={false} isNew={true}> </Album>
            }
            {!albumAdded &&
                <Button onClick={() => {
                    setAlbumAdded(true);
                }}>Add new album</Button>
            }
        </div>
    );
}

export default Works;
