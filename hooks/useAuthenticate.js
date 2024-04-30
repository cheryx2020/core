import { useState, useEffect } from "react"
import { verifyToken } from "@cheryx2020/utils";

const useAuthenticate = () => {
    const [verified, setVerified] = useState(false);
  useEffect(() => {
    checkAccess();
  }, []);
  const checkAccess = async () => {
    try {
      // we call the api that verifies the token.
      const data = await verifyToken();
      // if token was verified we set the state.
      if (localStorage.getItem("accessToken") && data.verified) {
        setVerified(true);
      } else {
        // If the token was fraud we first remove it from localStorage and then redirect to "/"
        localStorage.removeItem("accessToken");
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