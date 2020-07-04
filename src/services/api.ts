import axios from 'axios';

const HG_WEATHER_KEY = 'ab9786b6';

const api = axios.create({
  baseURL: `https://api.hgbrasil.com/weather?format=json-cors&key=${HG_WEATHER_KEY}&`,
});

export default api;
