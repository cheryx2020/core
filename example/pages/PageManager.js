import React from "react"
import PageManager from "../../src/components/page-manager/page-manager";
import { useRouter } from "next/router"
import Image from 'next/image';
import Link from 'next/link';

const PageManagerPage = () => {
    const router = useRouter();
    return <PageManager domain="cheryx.com" language="en" useRouter={useRouter} Image={Image} Link={Link}/>
    // return <PageManager domain="gocnhacolen.com" language="vi" useRouter={useRouter} Image={Image} Link={Link}/>
    // return <PageManager router={router} useRouter={useRouter} Image={Image} Link={Link}/>
} 
export default PageManagerPage;