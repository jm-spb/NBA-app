import axios from 'axios';

const instance = axios.create({
  // baseURL: 'https://api-nba-v1.p.rapidapi.com/',
  headers: {
    'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
    'x-rapidapi-key': `${process.env.REACT_APP_NBA_API_KEY}`
  }
});

export default instance;
