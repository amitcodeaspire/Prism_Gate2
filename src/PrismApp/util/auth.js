import axios from 'axios';
const API_KEY = 'AIzaSyCCG4gkyhr0crG0738BaICZOeJsgbhBRsg';

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });


  const token = response.data.idToken;
  const uid = response.data.localId;

  const re = {token: token, uid: uid};

  return re;
}

export async function fetchData(uid, token) {
  const url =
    'https://mygate-c06b2-default-rtdb.firebaseio.com/' +
    uid +
    '/Details.json' +
    '?auth=' +
    token;
  const response = await axios.get(url);

  return response.data;
}

export async function ResetPassword(email) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`;
  try {
    const response = await axios.post(url, {
      email: email,
      requestType: 'PASSWORD_RESET',
    });
    return 0;
  } catch (e) {
    console.log(e);
    return 1;
  }
}

export async function createUser(email, password) {

  const respone = await authenticate('signUp', email, password);
  return respone;
}

export function login(email, password) {
  return authenticate('signInWithPassword', email, password);
}

export async function getVistors(uid, token) {
  const Backend_Url = `https://prism-worker-gate-default-rtdb.firebaseio.com/Users/${uid}`;
  const vresponse = await axios.get(
    Backend_Url + '/Vistors.json?auth=' + token,
  );
  let newArr = [];
  for (var i in vresponse.data) {
    var tempobj = vresponse.data[i];
    tempobj['id'] = i;
    newArr.push(tempobj);
  }
  return newArr;
}
export async function getFlats(uid, token) {
  const Backend_Url = `https://prism-worker-gate-default-rtdb.firebaseio.com/Users/${uid}/Details/FlatDetails.json`;
  const vresponse = await axios.get(Backend_Url + '/?auth=' + token);
  let newArr = [];
  for (var i in vresponse.data) {
    var tempobj = vresponse.data[i];
    tempobj['id'] = i;
    newArr.push(tempobj);
  }
  return newArr;
}
export async function getDaily(url) {

    const vresponse = await axios.get(url);

    let newArr = [];
    for (var i in vresponse.data) {
      var tempobj = vresponse.data[i];
      tempobj['key'] = i;
      newArr.push(tempobj);
    }
    
    return newArr;
}
export async function getDates(key, token) {}
// Example POST method implementation:
export async function postData(url = '', data = {}) {
  // Default options are marked with *
  try {
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'key=AAAAo-4NtGs:APA91bF3rC6tt8e9US1G5w-OOKWHPXnp9x09puNpKms7_2STpd9ikCMH40Vd9ngZWhatVmcXUcIdEaax0HGHzDto-qie5prjxsccP25WCnyCJk4M-W0BImvc2p968k3QA8k1XhpLyotN',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
  
    return response.json(); // parses JSON response into native JavaScript objects
  } catch (error) {
    console.log(error)
  }
 
}

