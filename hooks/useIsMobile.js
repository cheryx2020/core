import { isMobileDevice } from "@cheryx2020/utils";
import React, { useEffect, useState } from "react";

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        setIsMobile(isMobileDevice());
    }, []);
    return isMobile;
}

export default useIsMobile;