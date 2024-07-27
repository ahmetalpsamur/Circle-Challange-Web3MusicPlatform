import axios from 'axios';

export const initialize_user = async () => {
  try {
    const response = await axios.post('http://localhost:5000/initialize-user');
    console.log('Challenge ID:', response.data.challengeId);
    return response.data.challengeId;
  } catch (error) {
    console.error('Error initializing user:', error);
    throw error;
  }
};
