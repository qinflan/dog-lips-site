import axios from "axios";

interface AppleRelease {
  collectionId: number;
  collectionName: string;
  releaseDate: string;
  collectionType: string;
  artworkUrl100: string;
  collectionViewUrl: string;
}

export interface MostRecentAppleRelease {
  id: number;
  name: string;
  releaseDate: string;
  type: string;
  image: string;
  url: string;
}

export interface MostRecentSpotifyRelease {
    id: string;
    name: string;
    releaseDate: string;
    albumType: string;
    type: string;
    images: {url: string}[];
    url: string;
}


export const getMostRecentAppleRelease = async (): Promise<MostRecentAppleRelease | null> => {
  try {
    const artistId = "1609694043";
    const url = `https://itunes.apple.com/lookup?id=${artistId}&entity=album`;
    const response = await axios.get(url);

    const albums: AppleRelease[] = response.data.results.filter(
      (r: any) => r.collectionType === "Album"
    );

    if (!albums.length) return null;

    const mostRecent = albums.reduce((latest, album) =>
      new Date(album.releaseDate) > new Date(latest.releaseDate) ? album : latest
    );

    return {
      id: mostRecent.collectionId,
      name: mostRecent.collectionName,
      releaseDate: mostRecent.releaseDate,
      type: mostRecent.collectionType,
      image: mostRecent.artworkUrl100,
      url: mostRecent.collectionViewUrl
    };
    } catch (err) {
        console.error("Error fetching apple release:", err);
        throw err;
    }
}

export const getMostRecentSpotifyRelease = async (): Promise<MostRecentSpotifyRelease | null> => {
    try {
        const url = "https://dog-lips-site-production.up.railway.app/music/recent";
        const response = await axios.get<{release: any}>(url);
        const release = response.data.release;

        if (!release) return null;

        return {
        id: release.id,
        name: release.name,
        releaseDate: release.release_date,
        albumType: release.album_type,
        type: "album",
        images: release.images,
        url: release.external_urls.spotify,
        };
    } catch (err) {
        console.error("Error fetching spotify release:", err);
        throw err;
    }
}


