import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // change si tu déploies
  withCredentials: true,
});

// Tu peux ici ajouter des intercepteurs si besoin

export default API;
