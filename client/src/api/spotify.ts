import axios from "axios";

const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';
const DOG_LIPS_ID = "1L23rbDqrblJpid1WJkBVE?si=bZx85w_0RoGMfibFd4a45A";

export const getAllReleases = async () => {
  try {
    const response = await axios.get(`${SPOTIFY_API_BASE_URL}/artists/${DOG_LIPS_ID}/albums`)
    return response
  } catch (error) {
    console.error("Error fetching most albums:", error);
  }
}

export const getMostRecentRelease = async () => {
  try {
    const releases = getAllReleases()
    // filter the releases to get the most recent one
  } catch (error) {
    console.error("Error fetching most recent release:", error);
  }
}
