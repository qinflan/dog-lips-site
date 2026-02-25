
export const fetchToken = () => {
    const token = sessionStorage.getItem('dog-lips-token');
    return token ? JSON.parse(token) : null;
}