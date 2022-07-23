import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getBands = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/bands.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const deleteSingleBand = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/bands/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

export {
  getBands,
  deleteSingleBand,
};
