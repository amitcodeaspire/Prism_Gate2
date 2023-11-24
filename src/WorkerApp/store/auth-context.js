import AsyncStorage from "@react-native-async-storage/async-storage";

import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
  uid: "",
  setuid: (uid) => {},
  userArray: [],
  setuserArray: (arr) => {},
  Society: "",
  setSociety: (name) => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [id, setd] = useState();
  const [userArr, setuserArr] = useState([]);
  const [Soc, setSo] = useState("");

  async function setuserArray(arr) {
    setuserArr(arr);
    console.log(userArr)
  }
  async function authenticate(token) {
    console.log("Auth Context Token");
    console.log(token);
    setAuthToken(token);
    await AsyncStorage.setItem("Worker_token", token)
      .then(console.log(token.length))
      .catch((e) => console.log(e));
  }

  

  async function logout() {
    setAuthToken(null);
    await AsyncStorage.removeItem("Worker_token");
    await AsyncStorage.removeItem("Worker_UID");
  }
  function setuid(uid) {
    console.log("Auth Context UID");
    setd(uid);
    AsyncStorage.setItem("Worker_UID", uid);
  }
  function setSociety(name) {
    setSo(name);
    // console.log(Soc)
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
    uid: id,
    setuid: setuid,
    userArray: userArr,
    setuserArray: setuserArray,
    Society: Soc,
    setSociety: setSociety,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
