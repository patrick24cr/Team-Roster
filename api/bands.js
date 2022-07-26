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

const getSingleBand = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/bands/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const getBandMembers = (bandFirebaseKey, uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/members.json?orderBy="band"&equalTo="${bandFirebaseKey}"`)
    .then((response) => {
      const filteredResponse = Object.values(response.data).filter((item) => item.uid === uid);
      resolve(filteredResponse);
    })
    .catch((error) => reject(error));
});

const viewBandDetails = (bandFirebaseKey, uid) => new Promise((resolve, reject) => {
  Promise.all([getSingleBand(bandFirebaseKey), getBandMembers(bandFirebaseKey, uid)])
    .then(([bandObject, bandMembersArray]) => {
      resolve({ ...bandObject, members: bandMembersArray });
    }).catch((error) => reject(error));
});

export {
  getBands,
  deleteSingleBand,
  getSingleBand,
  viewBandDetails,
};
