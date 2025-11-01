export default Page;
declare function Page({ name, content, theme, layout: { menu, breadcrumb, footer, header }, seo, Link, useDispatch, useRouter, Head, NextSeo, Image }: {
    name: any;
    content: any;
    theme: any;
    layout?: {
        menu: never[];
        breadcrumb: never[];
        footer: {};
    } | undefined;
    seo: any;
    Link?: (({ children, ...props }: {
        [x: string]: any;
        children: any;
    }) => React.JSX.Element) | undefined;
    useDispatch?: (() => (action: any) => void) | undefined;
    useRouter?: (() => {
        push: (url: any) => void;
        pathname: string;
        query: {};
        asPath: string;
    }) | undefined;
    Head?: (({ children }: {
        children: any;
    }) => React.JSX.Element) | undefined;
    NextSeo?: (({ children }: {
        children: any;
    }) => React.JSX.Element) | undefined;
    Image?: (({ children }: {
        children: any;
    }) => React.JSX.Element) | undefined;
}): React.JSX.Element;
import React from "react";
