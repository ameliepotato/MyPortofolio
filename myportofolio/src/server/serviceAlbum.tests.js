const axios = require('axios');

// Base URL of your API
const baseURL = 'http://localhost:5001/album';

// Test Data
const testAlbum = {
    name: 'Album',
    desc: 'my album',
    user: 'userAlbum',
    publicView: true
}

async function createAlbum() {
    try {
        const response = await axios.post(baseURL, testAlbum);
        console.log('Album Created:', response.data);
        return response.data._id; // Return the user ID for further operations
    } catch (error) {
        console.error('Error creating album:', error.response?.data || error.message);
    }
}

async function getAllAlbums() {
    try {
        const response = await axios.get(baseURL+'s');
        console.log('All Albums:', response.data);
    } catch (error) {
        console.error('Error fetching albums:', error.response?.data || error.message);
    }
}

async function getAlbumById(albumId) {
    try {
        const response = await axios.get(`${baseURL}/${albumId}`);
        console.log('Album Details:', response.data);
    } catch (error) {
        console.error('Error fetching album by ID:', error.response?.data || error.message);
    }
}

async function getAlbumsByUser(user) {
    try {
        const response = await axios.get(`${baseURL}s/${user}`);
        console.log('Albums:', response.data);
    } catch (error) {
        console.error('Error fetching albums:', error.response?.data || error.message);
    }
}

async function updateAlbum(albumId) {
    try {
        const updatedData = { name: 'Jane Doe' };
        const response = await axios.patch(`${baseURL}/${albumId}`, updatedData);
        console.log('Album Updated:', response.data);
    } catch (error) {
        console.error('Error updating album:', error.response?.data || error.message);
    }
}

// Function to delete a user by ID
async function deleteAlbum(albumId) {
    try {
        const response = await axios.delete(`${baseURL}/${albumId}`);
        console.log('Album Deleted:', response.data);
    } catch (error) {
        console.error('Error deleting album:', error.response?.data || error.message);
    }
}

// Main function to test the CRUD operations
async function testAlbumCRUDOperations() {
    const albumId = await createAlbum();

    if (albumId) {
        await getAllAlbums();
        await getAlbumById(albumId);
        await getAlbumsByUser(testAlbum.user);
        await updateAlbum(albumId);
        await deleteAlbum(albumId);
        await getAllAlbums(); // Verify the album is deleted
    }
}

testAlbumCRUDOperations();

