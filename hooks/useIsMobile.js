import { isMobileDevice } from "@cheryx2020/utils";
import React, { useEffect, useState } from "react";

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(isMobileDevice());
        };

        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);

        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, []);

    return isMobile;
}

export default useIsMobile;