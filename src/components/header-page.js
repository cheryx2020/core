import React from 'react';

const HeaderPage = ({ title, url, seoConfig, Head, NextSeo }) => {
    const mainTitle = process?.env?.NEXT_PUBLIC_SEO_mainTitle;
    let titlePage = `${mainTitle}${title ? ` - ${title}` : ''}`;
    if (titlePage.length > 60) {
        titlePage = mainTitle;
    }
    return <><Head>
        <title>{titlePage}</title>
        <link rel="icon" href="/favicon.ico" />
    </Head>
        {seoConfig ? seoConfig : <NextSeo
            title={titlePage}
            description={title}
            openGraph={{
                url: `${process?.env?.NEXT_PUBLIC_pageUrl}/${url}`,
                title: titlePage,
                description: title,
                images: [
                    {
                        url: 'https://gocnhacolen.com/images/footer.webp',
                        alt: titlePage,
                    }
                ],
                site_name: process?.env?.NEXT_PUBLIC_SEO_pageName,
            }}
        />}
    </>
}
export default HeaderPage;