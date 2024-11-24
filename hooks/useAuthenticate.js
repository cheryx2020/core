import { useState, useEffect } from "react"
import { verifyToken } from "@cheryx2020/utils";
const AUTH_KEY = "accessToken";

const useAuthenticate = () => {
    const [verified, setVerified] = useState(false);
  useEffect(() => {
    checkAccess();
  }, []);
  const checkAccess = async () => {
    try {
      if (!localStorage.getItem(AUTH_KEY)) {
        return {
          isAuth: false
        }
      }
      // we call the api that verifies the token.
      const data = await verifyToken();
      // if token was verified we set the state.
      if (localStorage.getItem(AUTH_KEY) && data.verified) {
        setVerified(true);
      } else {
        // If the token was fraud we first remove it from localStorage and then redirect to "/"
        localStorage.removeItem(AUTH_KEY);
        setVerified(false);
      }
    } catch(e) {
      console.log(e);
    }
  }
  return {
    isAuth: verified
  }
}
export default useAuthenticate;