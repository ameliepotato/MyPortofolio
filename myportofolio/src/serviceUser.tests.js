const axios = require('axios');

// Base URL of your API
const baseURL = 'http://localhost:5000/users';

// Test Data
const testUser = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '12345',
    username: 'hammer'
};

// Function to create a new user
async function createUser() {
    try {
        const response = await axios.post(baseURL, testUser);
        console.log('User Created:', response.data);
        return response.data._id; // Return the user ID for further operations
    } catch (error) {
        console.error('Error creating user:', error.response?.data || error.message);
    }
}

// Function to get all users
async function getAllUsers() {
    try {
        const response = await axios.get(baseURL);
        console.log('All Users:', response.data);
    } catch (error) {
        console.error('Error fetching users:', error.response?.data || error.message);
    }
}

// Function to get a user by ID
async function getUserById(userId) {
    try {
        const response = await axios.get(`${baseURL}/${userId}`);
        console.log('User Details:', response.data);
    } catch (error) {
        console.error('Error fetching user by ID:', error.response?.data || error.message);
    }
}

// Function to update a user by ID
async function updateUser(userId) {
    try {
        const updatedData = { name: 'Jane Doe' };
        const response = await axios.patch(`${baseURL}/${userId}`, updatedData);
        console.log('User Updated:', response.data);
    } catch (error) {
        console.error('Error updating user:', error.response?.data || error.message);
    }
}

// Function to delete a user by ID
async function deleteUser(userId) {
    try {
        const response = await axios.delete(`${baseURL}/${userId}`);
        console.log('User Deleted:', response.data);
    } catch (error) {
        console.error('Error deleting user:', error.response?.data || error.message);
    }
}

// Main function to test the CRUD operations
async function testUserCRUDOperations() {
    const userId = await createUser();

    if (userId) {
        await getAllUsers();
        await getUserById(userId);
        await updateUser(userId);
        await deleteUser(userId);
        await getAllUsers(); // Verify the user is deleted
    }
}

testUserCRUDOperations();

