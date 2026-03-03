import axios from 'axios';
import type { Show } from '../types/show';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://dog-lips-site-development.up.railway.app';

export const fetchShows = async (): Promise<Show[]> => {
  try {
    const response = await axios.get<Show[]>(`${API_BASE_URL}/api/shows`);
    return response.data;
    } catch (error) {
    console.error('Error fetching shows:', error);
    throw error;
  }
};

export const fetchShowById = async (id: number): Promise<Show> => {
  try {
    const response = await axios.get<Show>(`${API_BASE_URL}/api/shows/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching show with id ${id}:`, error);
    throw error;
  }
};
