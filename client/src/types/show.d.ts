export interface Show {
    id: number;
    date: string;
    venue: string;
    city: string;
    state: string; // also corresponds to country for international shows
    time: string;
    address?: string;
    price?: string;
    ticketsUrl?: string;
    flyer?: string; // filename stored on server
    flyerUrl?: string; // signed aws image url
}