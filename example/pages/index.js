import React from "react";
import Link from "next/link";
const Index = () => {
    return <div>
        <div>V1.0</div>
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <Link href="/ImageUploadable">ImageUploadable</Link>
            <Link href="/PatternItem">PatternItem</Link>
        </div>
    </div>
}
export default Index;
