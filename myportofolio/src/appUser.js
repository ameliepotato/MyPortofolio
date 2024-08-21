import axios from 'axios';
const urlUserService='http://localhost:5003/users';

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
findUser: async function(username) {
    try {      
      const response = await axios.get(urlUserService);
      var userFound = null;
      response.data.forEach(u => { if(u.username === username) userFound = u});
      console.log('User found:', userFound);
      return userFound; // Return the user ID for further operations
    } catch (error) {
      console.error('Error creating user:', error.response?.data || error.message);
    }
  },
loginUser: async function(user) {
    try {      
      var userFound = await this.findUser(user.username);
      if(userFound === null){
        this.createUser(user);
      } else {
        user = userFound;
      }
      console.log(user);
    } catch (error) {
      console.error('Error creating user:', error.response?.data || error.message);
    }
  }
};

export default appUser;