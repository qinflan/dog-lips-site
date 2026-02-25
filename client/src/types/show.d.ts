export interface Show {
    id: string;
    date: string;
    venue: string;
    city: string;
    state: string; // also corresponds to country for international shows
    time: string;
    address: string;
    ticketsUrl?: string;
    flyerUrl: string;
}