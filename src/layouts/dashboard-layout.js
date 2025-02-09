

import { useEffect } from 'react'
import { verifyToken } from "@cheryx2020/utils";
export default function DashboardLayout({children, callBackCheckAuth, callBackMessage = () => {}, callBackLoading = () => {}, patternType, id, isAdmin }) {
  const checkAccess = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const data = await verifyToken(accessToken);
        if (data.verified) {
          if (typeof callBackCheckAuth === 'function') {
            callBackCheckAuth(true);
          }
        }
      }
    } catch(e) {
      console.log(e);
    }
  }
  useEffect(async () => {
    checkAccess();
  },[]);

  return (
    <div >
        {children}
    </div>
  )
}
