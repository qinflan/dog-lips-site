import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://dog-lips-site-development.up.railway.app';

export const fetchShows = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/shows`);
    return response.data;
    } catch (error) {
    console.error('Error fetching shows:', error);
    throw error;
  }
};

export const fetchShowById = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/shows/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching show with id ${id}:`, error);
    throw error;
  }
};
