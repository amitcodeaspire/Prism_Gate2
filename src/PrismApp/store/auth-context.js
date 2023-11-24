import AsyncStorage from '@react-native-async-storage/async-storage';

import {createContext, useEffect, useState} from 'react';

export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  authenticate: token => {},
  logout: () => {},
  uid: '',
  setuid: uid => {},
  Society: "",
  setSociety: (name) => {},
});

function AuthContextProvider({children}) {
  const [authToken, setAuthToken] = useState();
  const [id, setd] = useState();
  const [Soc, setSo] = useState("");

  useEffect(() => {
    async function fetchtoken() {
      const token = await AsyncStorage.getItem('Prism_token');
      const uid = await AsyncStorage.getItem('Prism_UID');
      if (token && uid) {
        setAuthToken(token);
        setd(uid);
      }
    }
    fetchtoken();
  }, []);

  function authenticate(token) {
    setAuthToken(token);
    AsyncStorage.setItem('Prism_token', token)
      .then(()=>{})
      .catch(e => console.log(e));
  }
  function setSociety(name) {
    console.log(name,"gheszf")
    setSo(name);
  }
  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem('Prism_token');
    AsyncStorage.removeItem('Prism_UID');
  }
  function setuid(uid) {
    setd(uid);
    AsyncStorage.setItem('Prism_UID', uid);
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
    uid: id,
    setuid: setuid,
    Society: Soc,
    setSociety: setSociety,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
