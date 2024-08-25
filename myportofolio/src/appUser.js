import axios from 'axios';
const urlUserService='http://localhost:5003/users/';

const appUser = {
createUser: async function(newUser) {
    try {      
      const response = await axios.post(urlUserService, newUser);
      console.log('User Created:', response.data);
      return response.data._id; // Return the user ID for further operations
    } catch (error) {
      console.error('Error creating user:', error.response?.data || error.message);
    }
  },
getUser: async function name(userId, callback) {
  try {      
    const response = await axios.get(urlUserService + userId);
    console.log('User Found:', response.data);
    if(callback){
      callback(response.data);
    }
    return {name: response.data.name, username: response.data.username, id: userId}; 
  } catch (error) {
    console.error('Could not retrieve user:', error.response?.data || error.message);
  }
},
findUser: async function(username) {
    try {      
      const response = await axios.get(urlUserService, {username:username});
      var userFound = null;
      response.data.forEach(u => { if(!userFound && u.username === username) userFound = u});
      console.log('User found:', userFound);
      return { id: userFound._id, username: userFound.username, name: userFound.name }; 
    } catch (error) {
      console.error('Error creating user:', error.response?.data || error.message);
    }
  },
loginUser: async function(user, callback) {
    try {      
      var userFound = await this.findUser(user.username);
      if(userFound === null){
        userFound = await this.createUser(user);
      }
      console.log('User logged in: ', userFound);
      callback(userFound);
      return userFound._id;
    } catch (error) {
      console.error('Error creating user:', error.response?.data || error.message);
    }
  }
};

export default appUser;