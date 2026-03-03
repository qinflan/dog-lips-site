
// Convert MM-DD-YYYY to YYYY-MM-DD (one is used by db, one is the way we want to display/input)
export const formatDate = (dateStr: string): string => {
    const parts = dateStr.split('-');
    if (parts.length === 3 && parts[0].length === 2 && parts[1].length === 2 && parts[2].length === 4) {
    return `${parts[2]}-${parts[0]}-${parts[1]}`;
    }
    return dateStr;
};