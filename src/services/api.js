import axios from 'axios';

const getColor = color => {
    return axios.get(`/api/colors/${color}`);
}

export const api = {
    getColor
}