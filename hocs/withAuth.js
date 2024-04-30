import React from "react";
import { useCallback, useEffect, useState } from "react";
import { verifyToken } from "@cheryx2020/utils";

const withAuth = (WrappedComponent, Router) => {
  return (props) => {
    const isDevelopment = process?.env?.NODE_ENV === "development";
    const [verified, setVerified] = useState(isDevelopment || false);
    const goToRoot = useCallback(() => {
      if (typeof Router === "object" && typeof Router.replace === "function") {
        Router.replace("/");
      } else if (typeof location === "object") {
        location = "/"
      }
    }, [Router]);
    const checkAccess = async () => {
      const accessToken = localStorage.getItem("accessToken");
      // if no accessToken was found,then we redirect to "/" page.
      if (!accessToken) {
        goToRoot();
      } else {
        // we call the api that verifies the token.
        const data = await verifyToken(accessToken);
        // if token was verified we set the state.
        if (data.verified) {
          setVerified(data.verified);
        } else {
          // If the token was fraud we first remove it from localStorage and then redirect to "/"
          localStorage.removeItem("accessToken");
          goToRoot();
        }
      }
    }

    useEffect(() => {
      if (!isDevelopment) {
        checkAccess()
      }
    }, []);

    if (verified) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };
};

export default withAuth