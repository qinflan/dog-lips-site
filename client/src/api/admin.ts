import axios from "axios";
import type { Show } from "../types/show";

const API_BASE_URL = "https://dog-lips-site-production.up.railway.app";

const getAuthHeaders = () => {
  const token = sessionStorage.getItem("dog_lips_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Show API
export const createShow = async (show: Omit<Show, 'id'>) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/shows`, show, 
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating show:', error);
    throw error;
  }
};

export const updateShow = async (show: Show) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/shows/${show.id}`, show, { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        console.error(`Error updating show with id ${show.id}:`, error);
        throw error;
    }
};

export const deleteShow = async (id: string) => {
    try {        
        await axios.delete(`${API_BASE_URL}/shows/${id}`, { headers: getAuthHeaders() });
    } catch (error) {
        console.error(`Error deleting show with id ${id}:`, error);
        throw error;
    }
};

// Merch API
export const createMerch = async (merch: {
  price?: string;
  description?: string;
  image_url?: string;
  bandcamp_url?: string;
}) => {
  const response = await axios.post(`${API_BASE_URL}/admin/merch`, merch, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const updateMerch = async (
  id: number,
  merch: {
    price?: string;
    description?: string;
    image_url?: string;
    bandcamp_url?: string;
  }
) => {
  const response = await axios.put(`${API_BASE_URL}/admin/merch/${id}`, merch, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const deleteMerch = async (id: number) => {
  await axios.delete(`${API_BASE_URL}/admin/merch/${id}`, {
    headers: getAuthHeaders(),
  });
};

// Get presigned URL for file upload (shows or merch)
export const getPresignedUrl = async (filename: string) => {
  const response = await axios.post(
    `${API_BASE_URL}/shows/presign?filename=${encodeURIComponent(filename)}`,
    null,
    { headers: getAuthHeaders() }
  );
  return response.data.url;
};

// Upload file to S3 using presigned URL
export const uploadToS3 = async (presignedUrl: string, file: File) => {
  await fetch(presignedUrl, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type,
    },
  });
};

