import axios from 'axios';

const getColor = color => axios.get(`/api/colors/${color}`);
const getApp = () => axios.get('/api/app.model.json');
const getPage = name => axios.get(`/api/pages/${name}.model.json`);

export const api = { getColor, getPage, getApp };