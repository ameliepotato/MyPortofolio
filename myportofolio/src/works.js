import './App.css';
import { Button } from '@mui/material';
import { useState } from "react";
import Album from './album';

function Works() {
    const [albumAdded, setAlbumAdded] = useState(false);
    const [albums, setAlbums] = useState([{ id: "1", name: "one"},{ id: "2", name: "two"},{ id:"3", name:"three"}]);
    return (
        <div id="albums">
           {albums.map((album) => {
            return( 
                <Album name={ album.name } key={album.id} id={album.id} expanded={false}></Album>
           );
        })} 
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
