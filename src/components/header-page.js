import React from 'react';

const HeaderPage = ({ title, description, url, seoConfig, Head, NextSeo }) => {
    const mainTitle = process?.env?.NEXT_PUBLIC_SEO_mainTitle;
    const titleSeo = `${title ? title : mainTitle}`;
    const descriptionSeo = description ?? title;
    return <><Head>
        <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1" />
        <title>{titleSeo}</title>
        <link rel="icon" href="/favicon.ico" />
    </Head>
        {seoConfig ? seoConfig : <NextSeo
            title={titleSeo}
            description={descriptionSeo}
            openGraph={{
                url: `${process?.env?.NEXT_PUBLIC_pageUrl}/${url}`,
                title: titleSeo,
                description: descriptionSeo,
                images: [
                    {
                        url: 'https://gocnhacolen.com/images/footer.webp',
                        alt: titleSeo,
                    }
                ],
                site_name: process?.env?.NEXT_PUBLIC_SEO_pageName,
            }}
        />}
    </>
}
export default HeaderPage;