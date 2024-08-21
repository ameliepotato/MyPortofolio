const axios = require('axios');
const fs = require('fs');

// Base URL of your API
const baseURLPicture = 'http://localhost:5002/picture';

// Test Data
const testPhoto = {
    name: 'Photo',
    desc: 'my photo',
    album: 'userAlbum',
    photo: fs.readFileSync('public/logo192.png'),
    user: 'tete'
};

async function addPicture() {
    try {
        const response = await axios.post(baseURLPicture, testPhoto);
        console.log('Picture added:', response.data);
        return response.data._id; // Return the user ID for further operations
    } catch (error) {
        console.error('Error adding picture:', error.response?.data || error.message);
    }
}

async function getAllPictures() {
    try {
        const response = await axios.get(baseURLPicture+'s');
        console.log('All Pictures:', response.data);
    } catch (error) {
        console.error('Error fetching pictures:', error.response?.data || error.message);
    }
}

async function getPictureById(photoId) {
    try {
        const response = await axios.get(`${baseURLPicture}/${photoId}`);
        console.log('Picture Details:', response.data);
    } catch (error) {
        console.error('Error fetching picture by ID:', error.response?.data || error.message);
    }
}

async function updatePicture(photoId) {
    try {
        const updatedData = { name: 'Jane Doe' };
        const response = await axios.patch(`${baseURLPicture}/${photoId}`, updatedData);
        console.log('Picture Updated:', response.data);
    } catch (error) {
        console.error('Error updating picture:', error.response?.data || error.message);
    }
}

// Function to delete a user by ID
async function deletePicture(photoId) {
    try {
        const response = await axios.delete(`${baseURLPicture}/${photoId}`);
        console.log('Picture Deleted:', response.data);
    } catch (error) {
        console.error('Error deleting picture:', error.response?.data || error.message);
    }
}

async function getGallery(albumId) {
    try {
        const response = await axios.get(`${baseURLPicture}s/${albumId}`);
        console.log('Retrieving gallery:', response.data);
    } catch (error) {
        console.error('Error retrieving gallery:', error.response?.data || error.message);
    }
}

async function getGalleries(userId) {
    try {
        const response = await axios.get(`${baseURLUserGallery}s/${userId}`);
        console.log('Retrieving galleries:', response.data);
    } catch (error) {
        console.error('Error retrieving galleries:', error.response?.data || error.message);
    }
}

// Main function to test the CRUD operations
async function testPictureCRUDOperations() {
    const photoId = await addPicture();

    if (photoId) {
        await getAllPictures();
        await getPictureById(photoId);
        await updatePicture(photoId);
        await getGallery(testPhoto.album);
        await deletePicture(photoId);
        await getAllPictures(); // Verify the album is deleted

    }
}

testPictureCRUDOperations();
