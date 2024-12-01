import React, { useState } from "react";
import BestSeller from "../../src/components/best-seller/best-seller";
import { defaultImageUrl } from "../constant";
import Property, { Properties } from "../components/Property";

const Index = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    return <div>
            <BestSeller isMobile={isMobile} isAdmin={isAdmin} data={{
                "language": "vi",
                "description": "This is the best seller",
                "name": "Product 1",
                "nameColor": "#0A7BCA",
                "imageUrl": defaultImageUrl,
                "order": 1,
                "patternId": "product-1"
            }} />
            <Properties>
                <Property text="isAdmin" value={isAdmin} onChange={() => { setIsAdmin(!isAdmin) }} description="to show admin menu" />
                <Property text="isMobile" value={isMobile} onChange={() => { setIsMobile(!isMobile) }} description="mobile view" />
            </Properties>
    </div>
}
export default Index;