export default Page;
declare function Page({ name, content, theme, layout: { menu, breadcrumb, footer, header }, seo, Link, useDispatch, useRouter, Head, NextSeo, Image }: {
    name: any;
    content: any;
    theme: any;
    layout?: {
        menu: any[];
        breadcrumb: any[];
        footer: {};
    };
    seo: any;
    Link?: ({ children, ...props }: {
        [x: string]: any;
        children: any;
    }) => React.JSX.Element;
    useDispatch?: () => (action: any) => void;
    useRouter?: () => {
        push: (url: any) => void;
        pathname: string;
        query: {};
        asPath: string;
    };
    Head?: ({ children }: {
        children: any;
    }) => React.JSX.Element;
    NextSeo?: ({ children }: {
        children: any;
    }) => React.JSX.Element;
    Image?: ({ children }: {
        children: any;
    }) => React.JSX.Element;
}): React.JSX.Element;
import React from "react";
