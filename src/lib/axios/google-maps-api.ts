import axios from 'axios';

export const googleMapsApi = axios.create({
	baseURL: 'https://maps.googleapis.com/maps/api',
});
