import axios from 'axios';
const urlPictureService = 'http://localhost:5002/picture/';

const appPicture = {
    addPicture: async function (picture, callback) {
        try {
            const response = await axios.post(urlPictureService, picture);
            console.log('Picture added:', response.data);
            if(callback){
                var res = response.data;
                res.id = res._id;
                callback(res);
            }
            return response.data._id; // Return the picture ID for further operations
        } catch (error) {
            console.error('Error adding picture:', error.response?.data || error.message);
        }
    },

    deletePicture: async function (picture) {
        try {
            const response = await axios.delete(urlPictureService + picture);
            console.log('Picture deleted:', response.data);
        } catch (error) {
            console.error('Error deleting picture:', error.response?.data || error.message);
        }
    }
}

export default appPicture;