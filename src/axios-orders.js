import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-pizza-hub.firebaseio.com/',

});

export default instance;