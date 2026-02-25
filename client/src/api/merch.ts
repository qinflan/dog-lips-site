import axios from 'axios';
import type { Merch } from '../types/merch';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9090';

export const fetchMerch = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/merch`);
    return response.data;
    } catch (error) {
    console.error('Error fetching merch:', error);
    throw error;
  }
};

export const fetchMerchById = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/merch/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching merch with id ${id}:`, error);
    throw error;
  }
};

export const createMerch = async (merch: Omit<Merch, 'id'>) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/merch`, merch);
    return response.data;
  } catch (error) {
    console.error('Error creating merch:', error);
    throw error;
  }
};

export const updateMerch = async (merch: Merch) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/api/merch/${merch.id}`, merch);
        return response.data;
    } catch (error) {
        console.error(`Error updating merch with id ${merch.id}:`, error);
        throw error;
    }
};

export const deleteMerch = async (id: string) => {
    try {        
        await axios.delete(`${API_BASE_URL}/api/merch/${id}`);
    } catch (error) {
        console.error(`Error deleting merch with id ${id}:`, error);
        throw error;
    }
};