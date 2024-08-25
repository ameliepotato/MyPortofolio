import axios from 'axios';
const urlAlbumService = 'http://localhost:5001/album';
const urlPictureService = 'http://localhost:5002/pictures';

const appAlbum = {
  createAlbum: async function (album) {
    try {
      const response = await axios.post(urlAlbumService, album);
      console.log('Album Created:', response.data);
      return response.data._id;
    } catch (error) {
      console.error('Error creating album:', error.response?.data || error.message);
    }
  },
  findAlbum: async function (albumId) {
    try {
      const albumFound = await axios.get(`${urlAlbumService}/${albumId}`);
      console.log('Album found:', albumFound);
      return { name: albumFound.name, id: albumId, desc: albumFound.desc, user: albumFound.user, pinned: albumFound.pinned, publicView: albumFound.publicView};
    } catch (error) {
      console.error('Error finding album:', error.response?.data || error.message);
    }
  },
  getAlbums: async function (user) {
    try {
      const albumsFound = await axios.get(urlAlbumService+'s');
      console.log('Albums found:', albumsFound.data);
      var albums = [];
      albumsFound.data.forEach(a => {
        if(!user || a.user === user){
        albums.push({ name: a.name, desc: a.desc, id: a._id, user: a.user, pinned: a.pinned, publicView: a.publicView });
      }});
      console.log('Sending albums:', albums);
      return albums;
    } catch (error) {
      console.error('Error finding album:', error.response?.data || error.message);
    }
  },
  deleteAlbum: async function (albumId) {
    try {
      const albumFound = await axios.delete(`${urlAlbumService}/${albumId}`);
      return albumFound;
    } catch (error) {
      console.error('Error finding album:', error.response?.data || error.message);
    }
  },
  getGallery: async function name(albumId) {
    try {
      const gallery = await axios.get(`${urlPictureService}/${albumId}`);
      var galleryPhotos = [];
      gallery.data.forEach(a => {
        galleryPhotos.push({ name: a.name, desc: a.desc, id: a._id, album: albumId });
      });
      return galleryPhotos;
    } catch (error) {
      console.error('Error finding gallery:', error.response?.data || error.message);
    }
  }
};

export default appAlbum;