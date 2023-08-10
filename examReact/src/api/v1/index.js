import axios from 'axios';
const baseUrl = `http://localhost`;

export const fetchUsers = () => axios.get(`${baseUrl}v1/users`);
