import React from "react"
import PageEditor from "../../src/components/page-editor/page-editor";
import { useRouter } from "next/router"
import Image from 'next/image';
import Link from 'next/link';

const PageEditorPage = () => {
    const router = useRouter();
    // return <PageEditor domain="cheryx.com" language="en"/>
    // return <PageEditor domain="gocnhacolen.com" language="vi"/>
    return <PageEditor router={router} useRouter={useRouter} Image={Image} Link={Link}/>
} 
export default PageEditorPage;