import React from "react";
import Link from "next/link";
import "../../dist/index.css"
import "../../dist/styles/globals.scss"
const Index = () => {
    return <div>
        <div>V1.0</div>
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <Link href="/ImageUploadable">ImageUploadable</Link>
            <Link href="/PatternItem">PatternItem</Link>
            <Link href="/AdminMenu">AdminMenu</Link>
        </div>
    </div>
}
export default Index;
