import axios from "axios";
import uuid from "react-native-uuid";
const API_KEY = "AIzaSyCCG4gkyhr0crG0738BaICZOeJsgbhBRsg";

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  const token = response.data.idToken;
  const uid = response.data.localId;

  const re = { token: token, uid: uid };

  return re;
}

export async function fetchData(uid, token) {
  const url =
    "https://prism-worker-gate-default-rtdb.firebaseio.com/" +
    uid +
    "/Details.json" +
    "?auth=" +
    token;
  const response = await axios.get(url);

  return response.data;
}

export async function ResetPassword(email) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`;
  try {
    const response = await axios.post(url, {
      email: email,
      requestType: "PASSWORD_RESET",
    });
    return 0;
  } catch {
    return 1;
  }
}

export async function createUser(email, password) {
  const respone = await authenticate("signUp", email, password);
  return respone;
}

export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}

export async function fetchAuthUsers(token, Society) {
  const url = `https://prism-worker-gate-default-rtdb.firebaseio.com/Users.json?auth=${token}`;
  const response = await axios.get(url);
  const users = [];
  const FcmToken = [];
  const dropArra = [];
  for (const key in response.data) {
    const userData = await (response.data[key].Details)
    let myuuid = uuid.v4();
    for (var i in response.data[key]){

    }
    if (Society === userData.Society) {
      const dropObj = {
        label: response.data[key].Details.Name,
        value: response.data[key].Details.FcmToken + "Break" + myuuid,
      };
      dropArra.push(dropObj);
    }

  }

  return { user: users, fcm: FcmToken, drop: dropArra };
}

export async function getName(uid, token) {
  const url =
    "https://prism-worker-gate-default-rtdb.firebaseio.com/" +
    "/Worker/" +
    uid +
    ".json" +
    "?auth=" +
    token;

  const response = await axios.get(url);

  return response;
}
