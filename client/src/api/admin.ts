import axios from "axios";

const API_BASE_URL = "https://dog-lips-site-production.up.railway.app";

const getAuthHeaders = () => {
  const token = sessionStorage.getItem("dog_lips_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Show API
export const createShow = async (show: {
  date: string;
  venue: string;
  city: string;
  state: string;
  address: string;
  time: string;
  price?: string;
  tickets_url?: string;
  flyer_url?: string;
}) => {
  const response = await axios.post(`${API_BASE_URL}/admin/shows`, show, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const updateShow = async (id: number, show: any) => {
  const response = await axios.put(`${API_BASE_URL}/admin/shows/${id}`, show, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const deleteShow = async (id: number) => {
  await axios.delete(`${API_BASE_URL}/admin/shows/${id}`, {
    headers: getAuthHeaders(),
  });
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

export const updateMerch = async (id: number, merch: any) => {
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
    `${API_BASE_URL}/shows/presign?filename=${filename}`,
    {},
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

